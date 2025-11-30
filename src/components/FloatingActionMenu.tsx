import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RefreshCw, X } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";
import type { RoadmapStatus } from "../types";

export const FloatingActionMenu = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personalizado");
  const [status, setStatus] = useState<RoadmapStatus>("pending");
  const [estimatedHours, setEstimatedHours] = useState(4);

  const addNode = useRoadmapStore((s) => s.addNode);
  const resetProgress = useRoadmapStore((s) => s.resetProgress);
  const preferences = useRoadmapStore((s) => s.preferences);

  const handleAdd = () => {
    if (!title.trim()) return;
    addNode({
      title: title.trim(),
      category: category.trim() || "Personalizado",
      description: "Tema personalizado añadido a tu roadmap.",
      status,
      estimatedHours
    });
    setTitle("");
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              className="card mb-1 w-72 space-y-3 p-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                  Añadir nuevo tema al roadmap
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-slate-100 p-1 text-slate-600 transition-all hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  aria-label="Cerrar"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título del tema"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
                />
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Categoría (HTML, CSS, React, etc.)"
                  className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500"
                />
                <div className="flex items-center justify-between gap-2">
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-700 dark:text-slate-400">Estado inicial</span>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as RoadmapStatus)}
                      className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:focus:border-indigo-500"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="in-progress">En progreso</option>
                      <option value="completed">Completado</option>
                    </select>
                  </label>
                  <label className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-700 dark:text-slate-400">Horas estimadas</span>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={estimatedHours}
                      onChange={(e) => setEstimatedHours(Number(e.target.value) || 1)}
                      className="w-20 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:focus:border-indigo-500"
                    />
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex w-full items-center justify-center gap-1 rounded-lg bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-indigo-600 hover:shadow-md dark:bg-indigo-500/90 dark:hover:bg-indigo-500"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Añadir tema al roadmap
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Esto reiniciará el estado de todos los temas a 'Pendiente' y borrará tus notas. ¿Seguro?"
                    )
                  ) {
                    resetProgress();
                  }
                }}
                className="inline-flex items-center gap-1 text-[11px] text-slate-600 transition-colors hover:text-red-600 dark:text-slate-400 dark:hover:text-red-300"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Resetear progreso completo
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr text-white shadow-xl ${
            preferences.accentColor === "emerald"
              ? "from-emerald-500 via-teal-500 to-cyan-500 shadow-emerald-500/40"
              : preferences.accentColor === "rose"
              ? "from-rose-500 via-pink-500 to-fuchsia-500 shadow-rose-500/40"
              : "from-indigo-500 via-purple-500 to-pink-500 shadow-indigo-500/40"
          }`}
          whileTap={{ scale: 0.9 }}
        >
          {open ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </motion.button>
      </div>
    </>
  );
};


