import { motion } from "framer-motion";
import { CheckCircle2, CircleDot, CircleDashed, Clock3, StickyNote, Star } from "lucide-react";
import type { RoadmapNode as RoadmapNodeType } from "../types";
import { useRoadmapStore } from "../store/roadmapStore";

interface Props {
  node: RoadmapNodeType;
  onOpenDetails: () => void;
}

const statusConfig: Record<
  RoadmapNodeType["status"],
  { label: string; color: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: {
    label: "Pendiente",
    color: "bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
    icon: CircleDashed
  },
  "in-progress": {
    label: "En progreso",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    icon: CircleDot
  },
  completed: {
    label: "Completado",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    icon: CheckCircle2
  }
};

export const RoadmapNode = ({ node, onOpenDetails }: Props) => {
  const setStatus = useRoadmapStore((s) => s.setStatus);
  const reorderNode = useRoadmapStore((s) => s.reorderNode);
  const toggleFavorite = useRoadmapStore((s) => s.toggleFavorite);

  const config = statusConfig[node.status];

  return (
    <motion.article
      id={node.id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.5 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card group relative flex flex-col gap-3.5 overflow-hidden p-4 text-xs lg:gap-4 lg:p-5"
    >
      {/* Gradiente mejorado de fondo en hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-transparent to-purple-50/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/10" />
      
      <div className="relative z-10 flex flex-col gap-3.5 lg:gap-4">
        {/* Header mejorado */}
        <header className="flex items-start justify-between gap-3 lg:gap-4">
          <div className="flex-1 min-w-0 space-y-1.5 overflow-hidden lg:space-y-2">
            {/* Categoría y título */}
            <div className="flex items-start gap-2.5 lg:gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md lg:h-11 lg:w-11 lg:text-base dark:from-indigo-600 dark:to-purple-700">
                {node.category[0]?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0 overflow-hidden">
                <h3 className="text-base font-bold leading-snug text-slate-900 break-words lg:text-lg dark:text-slate-50">
                  {node.title}
                </h3>
              </div>
            </div>
            
            {/* Descripción */}
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-600 lg:text-sm dark:text-slate-400">
              {node.description}
            </p>
          </div>

          {/* Botones de acción en header */}
          <div className="flex shrink-0 flex-col items-end gap-1.5 lg:gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(node.id)}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all ${
                node.favorite
                  ? "border-amber-400 bg-amber-100 text-amber-600 shadow-sm dark:border-amber-400 dark:bg-amber-500/20 dark:text-amber-300"
                  : "border-slate-300 bg-white text-slate-400 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-amber-400 dark:hover:text-amber-300"
              }`}
              aria-label="Marcar como favorito"
            >
              <Star className={`h-4 w-4 ${node.favorite ? "fill-current" : ""}`} />
            </button>
            <button
              type="button"
              onClick={onOpenDetails}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700 transition-all hover:border-indigo-400 hover:bg-indigo-100 hover:shadow-md lg:px-4 lg:py-2 lg:text-sm dark:border-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-indigo-500/20"
            >
              Ver detalles
            </button>
          </div>
        </header>

        {/* Badges de estado y tiempo */}
        <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold lg:px-3 lg:py-1.5 lg:text-sm ${config.color}`}
          >
            <config.icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            {config.label}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-slate-800 dark:text-slate-300">
            <Clock3 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            {node.estimatedHours}h
          </span>
          {node.notes && node.notes.trim().length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 lg:px-3 lg:py-1.5 lg:text-sm dark:bg-indigo-500/10 dark:text-indigo-300">
              <StickyNote className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              Notas
            </span>
          )}
        </div>

        {/* Tags mejorados */}
        {node.tags && node.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 lg:gap-1.5">
            {node.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 lg:px-2.5 lg:text-xs dark:bg-slate-800 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer con botones de estado mejorados */}
        <footer className="mt-auto flex items-center justify-between gap-2 border-t border-slate-200 pt-2.5 lg:gap-3 lg:pt-3 dark:border-slate-800">
          {/* Botones de estado más grandes y claros */}
          <div className="flex flex-wrap items-center gap-1 lg:gap-1.5">
            <button
              type="button"
              onClick={() => setStatus(node.id, "pending")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all lg:px-3 lg:py-1.5 lg:text-sm ${
                node.status === "pending"
                  ? "bg-slate-300 text-slate-900 shadow-md dark:bg-slate-700 dark:text-slate-100"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              Pendiente
            </button>
            <button
              type="button"
              onClick={() => setStatus(node.id, "in-progress")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all lg:px-3 lg:py-1.5 lg:text-sm ${
                node.status === "in-progress"
                  ? "bg-amber-500 text-white shadow-md dark:bg-amber-500/90"
                  : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              En progreso
            </button>
            <button
              type="button"
              onClick={() => setStatus(node.id, "completed")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all lg:px-3 lg:py-1.5 lg:text-sm ${
                node.status === "completed"
                  ? "bg-emerald-500 text-white shadow-md dark:bg-emerald-500/90"
                  : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-sm dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              Completado
            </button>
          </div>

          {/* Botones de reordenar más discretos */}
          <div className="flex items-center gap-0.5 rounded-lg bg-slate-100 p-0.5 dark:bg-slate-900">
            <button
              type="button"
              onClick={() => reorderNode(node.id, "up")}
              className="rounded-md bg-white px-1.5 py-1 text-[11px] text-slate-600 transition-all hover:bg-slate-200 hover:shadow-sm dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Mover arriba"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => reorderNode(node.id, "down")}
              className="rounded-md bg-white px-1.5 py-1 text-[11px] text-slate-600 transition-all hover:bg-slate-200 hover:shadow-sm dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              aria-label="Mover abajo"
            >
              ↓
            </button>
          </div>
        </footer>
      </div>
    </motion.article>
  );
};


