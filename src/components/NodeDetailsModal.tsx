import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, StickyNote, Trash2, BookOpen, Globe, GraduationCap, Code2 } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";
import type { RoadmapNode } from "../types";

interface Props {
  node?: RoadmapNode;
  isOpen: boolean;
  onClose: () => void;
}

export const NodeDetailsModal = ({ node, isOpen, onClose }: Props) => {
  const setNotes = useRoadmapStore((s) => s.setNotes);
  const deleteNode = useRoadmapStore((s) => s.deleteNode);

  if (!node) return null;

  const handleDelete = () => {
    if (window.confirm("¿Seguro que quieres eliminar este tema del roadmap?")) {
      deleteNode(node.id);
      onClose();
    }
  };

  // Función para detectar el tipo de recurso y devolver el icono apropiado
  const getResourceIcon = (url: string, label: string) => {
    const lowerUrl = url.toLowerCase();
    const lowerLabel = label.toLowerCase();
    
    if (lowerUrl.includes("mdn") || lowerLabel.includes("mdn")) {
      return <BookOpen className="h-4 w-4" />;
    }
    if (lowerUrl.includes("react") || lowerLabel.includes("react")) {
      return <Code2 className="h-4 w-4" />;
    }
    if (lowerUrl.includes("eloquent") || lowerLabel.includes("eloquent")) {
      return <GraduationCap className="h-4 w-4" />;
    }
    return <Globe className="h-4 w-4" />;
  };

  // Función para obtener el color del recurso según el tipo
  const getResourceColor = (url: string, label: string) => {
    const lowerUrl = url.toLowerCase();
    const lowerLabel = label.toLowerCase();
    
    if (lowerUrl.includes("mdn") || lowerLabel.includes("mdn")) {
      return {
        gradient: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50 hover:bg-blue-100",
        text: "text-blue-700 hover:text-blue-800",
        dark: {
          gradient: "dark:from-blue-600 dark:to-indigo-700",
          bg: "dark:bg-blue-500/10 dark:hover:bg-blue-500/20",
          text: "dark:text-blue-300"
        }
      };
    }
    if (lowerUrl.includes("react") || lowerLabel.includes("react")) {
      return {
        gradient: "from-cyan-500 to-blue-600",
        bg: "bg-cyan-50 hover:bg-cyan-100",
        text: "text-cyan-700 hover:text-cyan-800",
        dark: {
          gradient: "dark:from-cyan-600 dark:to-blue-700",
          bg: "dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20",
          text: "dark:text-cyan-300"
        }
      };
    }
    if (lowerUrl.includes("eloquent") || lowerLabel.includes("eloquent")) {
      return {
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50 hover:bg-emerald-100",
        text: "text-emerald-700 hover:text-emerald-800",
        dark: {
          gradient: "dark:from-emerald-600 dark:to-teal-700",
          bg: "dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20",
          text: "dark:text-emerald-300"
        }
      };
    }
    return {
      gradient: "from-indigo-500 to-purple-600",
      bg: "bg-indigo-50 hover:bg-indigo-100",
      text: "text-indigo-700 hover:text-indigo-800",
      dark: {
        gradient: "dark:from-indigo-600 dark:to-purple-700",
        bg: "dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20",
        text: "dark:text-indigo-300"
      }
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="card relative max-h-[90vh] w-full max-w-lg overflow-hidden p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{node.title}</h2>
                <p className="mt-1 text-xs text-slate-700 dark:text-slate-400">{node.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 p-1 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 overflow-y-auto pr-1 text-xs">
              {node.resources && node.resources.length > 0 && (
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Recursos recomendados
                    </h3>
                  </div>
                  <div className="grid gap-2.5">
                    {node.resources.map((r, index) => {
                      const colors = getResourceColor(r.url, r.label);
                      return (
                        <motion.a
                          key={r.url}
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className={`group relative flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all duration-200 ${colors.bg} ${colors.text} ${colors.dark.bg} ${colors.dark.text} dark:border-slate-800`}
                        >
                          {/* Icono con gradiente */}
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${colors.gradient} ${colors.dark.gradient} text-white shadow-sm`}>
                            {getResourceIcon(r.url, r.label)}
                          </div>
                          
                          {/* Contenido */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium leading-tight">{r.label}</p>
                            <p className="mt-0.5 truncate text-[10px] opacity-70">
                              {new URL(r.url).hostname.replace('www.', '')}
                            </p>
                          </div>
                          
                          {/* Icono de enlace externo */}
                          <ExternalLink className="h-4 w-4 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
                          
                          {/* Efecto de brillo en hover */}
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/0 to-white/20 opacity-0 transition-opacity group-hover:opacity-100 dark:from-white/0 dark:via-white/0 dark:to-white/10" />
                        </motion.a>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[10px] text-slate-600 dark:text-slate-500">
                    💡 Haz clic en cualquier recurso para abrirlo en una nueva pestaña
                  </p>
                </section>
              )}

              <section>
                <h3 className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-400">
                  <StickyNote className="h-3 w-3" />
                  Notas personales
                </h3>
                <textarea
                  defaultValue={node.notes}
                  placeholder="Anota aquí enlaces, ideas, dudas o recordatorios sobre este tema…"
                  onBlur={(e) => setNotes(node.id, e.target.value)}
                  className="min-h-[96px] w-full rounded-xl border border-slate-300 bg-white p-2 text-xs text-slate-900 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
                />
                <p className="mt-1 text-[10px] text-slate-600 dark:text-slate-500">
                  Las notas se guardan automáticamente en tu navegador (localStorage).
                </p>
              </section>
            </div>

            <footer className="mt-3 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-2 text-[11px] text-slate-700 dark:text-slate-500">
              <div className="space-y-0.5">
                {node.estimatedHours && (
                  <p>Tiempo estimado: {node.estimatedHours}h de estudio.</p>
                )}
                {node.updatedAt && (
                  <p>Última actualización: {new Date(node.updatedAt).toLocaleString()}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-1 rounded-full border border-red-400 bg-red-50 px-3 py-1 text-[11px] font-medium text-red-700 transition-all hover:bg-red-100 hover:text-red-800 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
              >
                <Trash2 className="h-3 w-3" />
                Eliminar tema
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


