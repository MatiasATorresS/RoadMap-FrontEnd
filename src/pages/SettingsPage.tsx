import { Settings, Database, Trash2 } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";
import { UserPreferencesPanel } from "../components/UserPreferencesPanel";

export const SettingsPage = () => {
  const resetProgress = useRoadmapStore((s) => s.resetProgress);

  const handleClearStorage = () => {
    if (
      window.confirm(
        "Esto borrará todo lo guardado en localStorage para este roadmap (incluyendo temas personalizados). ¿Seguro?"
      )
    ) {
      localStorage.removeItem("frontend-roadmap-state");
      window.location.reload();
    }
  };

  return (
    <main className="mx-auto flex max-w-5xl flex-1 flex-col gap-4 px-4 py-4 lg:gap-6 lg:px-6 lg:py-6">
      <header className="flex items-center gap-3 lg:gap-4">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-slate-50 shadow-lg shadow-indigo-500/40 lg:h-11 lg:w-11">
          <Settings className="h-4 w-4 lg:h-5 lg:w-5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-slate-800 lg:text-xl dark:text-slate-50">Configuración general</h1>
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
            Ajusta la apariencia del roadmap y gestiona los datos guardados localmente.
          </p>
        </div>
      </header>

      <UserPreferencesPanel />

      <section className="grid gap-3 md:grid-cols-2 lg:gap-4">
        <div className="card space-y-2 p-4 text-xs lg:p-5 lg:space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 lg:text-base dark:text-slate-50">
            <Database className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600 dark:text-emerald-400" />
            Datos guardados en localStorage
          </h2>
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
            Este roadmap funciona completamente en el navegador usando{" "}
            <span className="font-medium text-slate-800 dark:text-slate-200">localStorage</span>. No hay backend ni
            servidores; todo se queda en tu dispositivo.
          </p>
          <ul className="list-disc pl-4 text-[11px] text-slate-600 lg:text-xs lg:space-y-1 dark:text-slate-400">
            <li>Progreso de cada tema (pendiente, en progreso, completado).</li>
            <li>Notas personales que escribas en cada nodo.</li>
            <li>Temas personalizados que añadas o elimines.</li>
            <li>Tus preferencias visuales (tema, tamaño de fuente, vista, etc.).</li>
          </ul>
        </div>

        <div className="card space-y-3 p-4 text-xs lg:p-5 lg:space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-800 lg:text-base dark:text-slate-50">
            <Trash2 className="h-4 w-4 lg:h-5 lg:w-5 text-red-600 dark:text-red-400" />
            Acciones peligrosas
          </h2>
          <div className="space-y-2 lg:space-y-3">
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
              className="flex w-full items-center justify-center gap-1 rounded-lg border border-amber-500/40 bg-amber-100 text-amber-800 px-3 py-1.5 text-xs font-medium hover:bg-amber-200 lg:px-4 lg:py-2 lg:text-sm dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
            >
              Resetear sólo el progreso
            </button>
            <button
              type="button"
              onClick={handleClearStorage}
              className="flex w-full items-center justify-center gap-1 rounded-lg border border-red-500/50 bg-red-100 text-red-800 px-3 py-1.5 text-xs font-medium hover:bg-red-200 lg:px-4 lg:py-2 lg:text-sm dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
            >
              Borrar todo de localStorage
            </button>
          </div>
          <p className="text-[11px] text-slate-600 lg:text-xs dark:text-slate-500">
            Estas acciones son irreversibles. Úsalas sólo si quieres empezar completamente de cero.
          </p>
        </div>
      </section>
    </main>
  );
};


