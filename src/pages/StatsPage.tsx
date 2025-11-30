import { useMemo } from "react";
import { BarChart3, Clock3, CheckCircle2, CircleDot, CircleDashed, Flame } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";

export const StatsPage = () => {
  const getStats = useRoadmapStore((s) => s.stats);
  const stats = useMemo(() => getStats(), [getStats]);

  return (
    <main className="mx-auto flex max-w-5xl flex-1 flex-col gap-4 px-4 py-4 lg:gap-6 lg:px-6 lg:py-6">
      <header className="flex items-center gap-3 lg:gap-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/40 lg:h-11 lg:w-11">
          <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-slate-800 lg:text-xl dark:text-slate-50">Estadísticas de tu progreso</h1>
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
            Revisa cuánto has avanzado en el roadmap y qué temas has trabajado recientemente.
          </p>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-4 lg:gap-4">
        <div className="card space-y-1 p-3 text-xs lg:p-4 lg:space-y-2">
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">Progreso total</p>
          <p className="text-2xl font-semibold text-slate-800 lg:text-3xl dark:text-slate-50">
            {stats.completionPercentage}
            <span className="ml-1 text-xs lg:text-sm text-slate-600 dark:text-slate-400">%</span>
          </p>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            {stats.completedCount} de {stats.totalNodes} temas completados.
          </p>
        </div>

        <div className="card space-y-1 p-3 text-xs lg:p-4 lg:space-y-2">
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">Distribución de estados</p>
          <ul className="space-y-1 text-[11px] text-slate-700 lg:text-xs lg:space-y-1.5 dark:text-slate-300">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-emerald-600 dark:text-emerald-400" />
              Completados: {stats.completedCount}
            </li>
            <li className="flex items-center gap-1.5">
              <CircleDot className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-amber-600 dark:text-amber-300" />
              En progreso: {stats.inProgressCount}
            </li>
            <li className="flex items-center gap-1.5">
              <CircleDashed className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-slate-500 dark:text-slate-400" />
              Pendientes: {stats.pendingCount}
            </li>
          </ul>
        </div>

        <div className="card space-y-1 p-3 text-xs lg:p-4 lg:space-y-2">
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">Tiempo estimado</p>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-semibold text-slate-800 lg:text-2xl dark:text-slate-50">{stats.totalEstimatedHours}h</p>
          </div>
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            De ellas, alrededor de{" "}
            <span className="font-medium text-emerald-600 dark:text-emerald-300">
              {stats.completedEstimatedHours}h
            </span>{" "}
            ya las has trabajado.
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            <Clock3 className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            Usa estas horas como referencia aproximada, no como obligación.
          </p>
        </div>

        <div className="card space-y-1 p-3 text-xs lg:p-4 lg:space-y-2">
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">Hoy</p>
          <p className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 lg:text-base dark:text-slate-50">
            <Flame className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-amber-600 dark:text-amber-400" />
            {stats.completedToday > 0
              ? `Has completado ${stats.completedToday} tema${
                  stats.completedToday > 1 ? "s" : ""
                } hoy`
              : "Aún no has completado temas hoy"}
          </p>
          <p className="mt-1 text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            Cuenta los temas que has marcado como <span className="text-emerald-600 dark:text-emerald-300">Completado</span> en la fecha de hoy.
          </p>
        </div>
      </section>

      <section className="card mt-1 space-y-2 p-4 text-xs lg:p-6 lg:space-y-3">
        <header className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-800 lg:text-base dark:text-slate-50">Últimos temas trabajados</p>
            <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
              Se listan los últimos nodos que has abierto o modificado recientemente.
            </p>
          </div>
        </header>
        {stats.lastVisitedNodes.length === 0 ? (
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            Todavía no has abierto ningún tema. Ve al roadmap y abre uno para empezar.
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-xs lg:text-sm">
            {stats.lastVisitedNodes.map((node) => (
              <li key={node.id} className="flex items-center justify-between gap-3 py-2 lg:py-3">
                <div>
                  <p className="font-medium text-slate-800 lg:text-base dark:text-slate-100">{node.title}</p>
                  <p className="mt-0.5 text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
                    {node.category} ·{" "}
                    {node.lastVisitedAt
                      ? new Date(node.lastVisitedAt).toLocaleString()
                      : "sin fecha"}
                  </p>
                </div>
                <span className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
                  {node.status === "completed"
                    ? "Completado"
                    : node.status === "in-progress"
                    ? "En progreso"
                    : "Pendiente"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};


