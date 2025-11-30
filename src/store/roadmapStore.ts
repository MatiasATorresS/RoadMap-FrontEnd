import { create } from "zustand";
import { persist } from "zustand/middleware";
import baseRoadmap from "../data/roadmap.json";
import type { RoadmapNode, RoadmapStatus, RoadmapStats, UserPreferences } from "../types";

interface RoadmapState {
  nodes: RoadmapNode[];
  preferences: UserPreferences;
  selectedNodeId?: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedNode: (id?: string) => void;
  addNode: (partial: Omit<RoadmapNode, "id" | "createdAt" | "updatedAt" | "order">) => void;
  updateNode: (id: string, updates: Partial<RoadmapNode>) => void;
  deleteNode: (id: string) => void;
  reorderNode: (id: string, direction: "up" | "down") => void;
  setStatus: (id: string, status: RoadmapStatus) => void;
  setNotes: (id: string, notes: string) => void;
  toggleFavorite: (id: string) => void;
  resetProgress: () => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  stats: () => RoadmapStats;
}

const defaultPreferences: UserPreferences = {
  theme: "dark",
  fontScale: "md",
  accentColor: "indigo",
  compactMode: false,
  viewMode: "grid"
};

const withOrder = (nodes: RoadmapNode[]): RoadmapNode[] =>
  nodes
    .map((node, index) => ({
      ...node,
      order: node.order ?? index
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

export const useRoadmapStore = create<RoadmapState>()(
  persist(
    (set, get) => ({
      nodes: withOrder(baseRoadmap as RoadmapNode[]),
      preferences: defaultPreferences,
      selectedNodeId: undefined,
      searchQuery: "",

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedNode: (id) => {
        if (!id) {
          set({ selectedNodeId: undefined });
          return;
        }
        const now = new Date().toISOString();
        set((state) => ({
          selectedNodeId: id,
          nodes: state.nodes.map((n) => (n.id === id ? { ...n, lastVisitedAt: now } : n))
        }));
      },

      addNode: (partial) =>
        set((state) => {
          const now = new Date().toISOString();
          const maxOrder = state.nodes.reduce((max, n) => Math.max(max, n.order ?? 0), 0);
          const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          const newNode: RoadmapNode = {
            ...partial,
            id,
            status: partial.status ?? "pending",
            createdAt: now,
            updatedAt: now,
            order: maxOrder + 1
          };
          return { nodes: [...state.nodes, newNode] };
        }),

      updateNode: (id, updates) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
          )
        })),

      deleteNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
          selectedNodeId: state.selectedNodeId === id ? undefined : state.selectedNodeId
        })),

      reorderNode: (id, direction) =>
        set((state) => {
          const sorted = withOrder(state.nodes);
          const index = sorted.findIndex((n) => n.id === id);
          if (index === -1) return {};
          const targetIndex = direction === "up" ? index - 1 : index + 1;
          if (targetIndex < 0 || targetIndex >= sorted.length) return {};
          const newArr = [...sorted];
          const tempOrder = newArr[index].order ?? index;
          newArr[index].order = newArr[targetIndex].order ?? targetIndex;
          newArr[targetIndex].order = tempOrder;
          return { nodes: withOrder(newArr) };
        }),

      setStatus: (id, status) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id
              ? {
                  ...n,
                  status,
                  updatedAt: new Date().toISOString()
                }
              : n
          )
        })),

      setNotes: (id, notes) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id ? { ...n, notes, updatedAt: new Date().toISOString() } : n
          )
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id ? { ...n, favorite: !n.favorite, updatedAt: new Date().toISOString() } : n
          )
        })),

      resetProgress: () =>
        set({
          nodes: withOrder(
            (baseRoadmap as RoadmapNode[]).map((n) => ({
              ...n,
              status: "pending",
              notes: ""
            }))
          ),
          selectedNodeId: undefined
        }),

      updatePreferences: (updates) =>
        set((state) => ({
          preferences: { ...state.preferences, ...updates }
        })),

      stats: () => {
        const nodes = get().nodes;
        const totalNodes = nodes.length;
        const completedCount = nodes.filter((n) => n.status === "completed").length;
        const inProgressCount = nodes.filter((n) => n.status === "in-progress").length;
        const pendingCount = nodes.filter((n) => n.status === "pending").length;
        const completionPercentage =
          totalNodes === 0 ? 0 : Math.round((completedCount / totalNodes) * 100);

        const totalEstimatedHours = nodes.reduce((sum, n) => sum + (n.estimatedHours ?? 0), 0);
        const completedEstimatedHours = nodes
          .filter((n) => n.status === "completed")
          .reduce((sum, n) => sum + (n.estimatedHours ?? 0), 0);

        const lastVisitedNodes = [...nodes]
          .filter((n) => n.lastVisitedAt)
          .sort(
            (a, b) =>
              new Date(b.lastVisitedAt ?? "").getTime() -
              new Date(a.lastVisitedAt ?? "").getTime()
          )
          .slice(0, 5);

        const lastUpdatedAt = nodes
          .map((n) => n.updatedAt)
          .filter(Boolean)
          .sort()
          .at(-1);

        const today = new Date();
        const todayKey = today.toISOString().slice(0, 10);
        const completedToday = nodes.filter((n) => {
          if (n.status !== "completed" || !n.updatedAt) return false;
          return n.updatedAt.slice(0, 10) === todayKey;
        }).length;

        return {
          totalNodes,
          completedCount,
          inProgressCount,
          pendingCount,
          completionPercentage,
          totalEstimatedHours,
          completedEstimatedHours,
          lastVisitedNodes,
          lastUpdatedAt,
          completedToday
        };
      }
    }),
    {
      name: "frontend-roadmap-state"
    }
  )
);


