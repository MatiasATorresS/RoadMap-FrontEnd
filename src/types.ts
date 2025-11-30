export type RoadmapStatus = "pending" | "in-progress" | "completed";

export interface RoadmapResource {
  label: string;
  url: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  description: string;
  status: RoadmapStatus;
  estimatedHours: number;
  tags?: string[];
  resources?: RoadmapResource[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  lastVisitedAt?: string;
  order?: number;
  favorite?: boolean;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  fontScale: "sm" | "md" | "lg";
  accentColor: "indigo" | "emerald" | "rose";
  compactMode: boolean;
  viewMode: "grid" | "timeline";
}

export interface RoadmapStats {
  totalNodes: number;
  completedCount: number;
  inProgressCount: number;
  pendingCount: number;
  completionPercentage: number;
  totalEstimatedHours: number;
  completedEstimatedHours: number;
  lastUpdatedAt?: string;
  lastVisitedNodes: RoadmapNode[];
  completedToday: number;
}


