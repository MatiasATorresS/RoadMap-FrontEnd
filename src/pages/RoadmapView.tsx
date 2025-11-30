import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Route } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";
import { RoadmapNode } from "../components/RoadmapNode";
import { NodeDetailsModal } from "../components/NodeDetailsModal";
import { SearchBar } from "../components/SearchBar";
import { FiltersBar } from "../components/FiltersBar";

export const RoadmapView = () => {
  const nodes = useRoadmapStore((s) => s.nodes);
  const searchQuery = useRoadmapStore((s) => s.searchQuery);
  const selectedNodeId = useRoadmapStore((s) => s.selectedNodeId);
  const setSelectedNode = useRoadmapStore((s) => s.setSelectedNode);
  const preferences = useRoadmapStore((s) => s.preferences);
  const getStats = useRoadmapStore((s) => s.stats);
  const setStatus = useRoadmapStore((s) => s.setStatus);

  const [timelineExpanded, setTimelineExpanded] = useState(true);

  const filteredNodes = useMemo(() => {
    const ordered = [...nodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const tokens = searchQuery.toLowerCase().split(" ").filter(Boolean);

    let statusFilter: "all" | "pending" | "in-progress" | "completed" = "all";
    let favoritesOnly = false;
    let categoryFilter: string | undefined;
    const textTokens: string[] = [];

    tokens.forEach((t) => {
      if (t === "is:pending") statusFilter = "pending";
      else if (t === "is:progress") statusFilter = "in-progress";
      else if (t === "is:completed") statusFilter = "completed";
      else if (t === "is:fav" || t === "is:favorite") favoritesOnly = true;
      else if (t.startsWith("cat:")) categoryFilter = t.slice(4);
      else textTokens.push(t);
    });

    if (!tokens.length) return ordered;

    return ordered.filter((n) => {
      if (statusFilter !== "all" && n.status !== statusFilter) return false;
      if (favoritesOnly && !n.favorite) return false;
      if (categoryFilter && n.category.toLowerCase() !== categoryFilter) return false;

      if (!textTokens.length) return true;

      const base = `${n.title} ${n.category} ${(n.tags ?? []).join(" ")}`.toLowerCase();
      return textTokens.every((tk) => base.includes(tk));
    });
  }, [nodes, searchQuery]);

  const selectedNode = filteredNodes.find((n) => n.id === selectedNodeId);

  const compact = preferences.compactMode;
  const isTimeline = preferences.viewMode === "timeline";
  const stats = useMemo(() => getStats(), [getStats]);

  const goToNextPending = () => {
    const ordered = [...nodes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const next = ordered.find((n) => n.status === "pending" || n.status === "in-progress");
    if (!next) return;
    if (next.status === "pending") {
      setStatus(next.id, "in-progress");
    }
    setSelectedNode(next.id);
    const element = document.getElementById(next.id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-5 px-3 py-5 sm:px-4 sm:gap-6 sm:py-6 lg:gap-7 lg:px-6 lg:py-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:gap-5">
        <div className="space-y-1.5 min-w-0 flex-1">
          <h1 className="text-base font-semibold text-slate-800 dark:text-slate-50 sm:text-lg">
            Roadmap de aprendizaje Frontend
          </h1>
          <p className="text-[11px] text-slate-700 dark:text-slate-400 sm:text-xs">
            Sigue la ruta propuesta, personaliza los temas y marca tu progreso. Todo se guarda
            automáticamente en tu navegador.
          </p>
          <div className="flex flex-wrap gap-1 text-[10px] text-slate-700 dark:text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 dark:bg-slate-900/80 px-2 py-0.5">
              <Route className="h-3 w-3" />
              Vista {isTimeline ? "timeline" : "grid"} ·{" "}
              {compact ? "Modo compacto" : "Modo cómodo"}
            </span>
          </div>
        </div>
        <div className="w-full sm:w-auto sm:min-w-[200px] sm:max-w-md">
          <SearchBar />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-[2fr,3fr] lg:gap-5 xl:gap-6">
        <div className="card flex flex-col gap-3 p-3 text-xs sm:flex-row sm:items-center sm:justify-between lg:p-4">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-700 lg:text-xs dark:text-slate-400">Resumen rápido</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 sm:text-base lg:text-lg">
              {stats.completionPercentage}% completado
            </p>
            <p className="mt-1 text-[11px] text-slate-700 lg:text-xs dark:text-slate-500">
              {stats.completedCount} de {stats.totalNodes} temas · Hoy completaste{" "}
              <span className="font-medium text-emerald-700 dark:text-emerald-300">{stats.completedToday}</span>.
            </p>
            <button
              type="button"
              onClick={goToNextPending}
              className="mt-2 inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-2 py-1 text-[10px] font-medium text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30 sm:hidden"
            >
              Ir al siguiente tema recomendado
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-900">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                {stats.completedCount}/{stats.totalNodes}
              </span>
            </div>
            <button
              type="button"
              onClick={goToNextPending}
              className="hidden items-center gap-1 rounded-lg bg-emerald-100 px-3 py-1.5 text-[11px] font-medium text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-300 dark:hover:bg-emerald-500/30 sm:inline-flex"
            >
              Ir al siguiente tema recomendado
            </button>
          </div>
        </div>
        <FiltersBar />
      </section>

      {isTimeline ? (
        <section className="card relative overflow-hidden p-4">
          <header className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-indigo-300">
                <GitBranch className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-50">Timeline de aprendizaje</p>
                <p className="text-[11px] text-slate-400">
                  Visualiza tu progreso como una línea de tiempo secuencial.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTimelineExpanded((v) => !v)}
              className="rounded-full bg-slate-900 px-3 py-1 text-[11px] text-slate-300 hover:bg-slate-800"
            >
              {timelineExpanded ? "Contraer" : "Expandir"}
            </button>
          </header>

          <AnimatePresence initial={false}>
            {timelineExpanded && (
              <motion.ol
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="relative ml-2 space-y-4 border-l border-dashed border-slate-700/80 pl-4 text-xs"
              >
                {filteredNodes.map((node, index) => (
                  <li key={node.id} className="relative">
                    <div className="absolute -left-[11px] top-2 flex h-4 w-4 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[10px] text-slate-400">
                      {index + 1}
                    </div>
                    <RoadmapNode node={node} onOpenDetails={() => setSelectedNode(node.id)} />
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </section>
      ) : (
        <section
          className={`grid gap-4 lg:gap-5 ${
            compact
              ? "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence>
            {filteredNodes.map((node) => (
              <RoadmapNode
                key={node.id}
                node={node}
                onOpenDetails={() => setSelectedNode(node.id)}
              />
            ))}
          </AnimatePresence>
        </section>
      )}

      <NodeDetailsModal
        node={selectedNode}
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(undefined)}
      />
    </main>
  );
};


