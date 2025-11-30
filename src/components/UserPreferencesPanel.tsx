import { useRoadmapStore } from "../store/roadmapStore";

export const UserPreferencesPanel = () => {
  const preferences = useRoadmapStore((s) => s.preferences);
  const updatePreferences = useRoadmapStore((s) => s.updatePreferences);

  return (
    <section className="card space-y-4 p-4 text-xs lg:p-5 lg:space-y-5">
      <header>
        <h2 className="text-sm font-semibold text-slate-800 lg:text-base dark:text-slate-50">Preferencias de visualización</h2>
        <p className="mt-1 text-[11px] text-slate-600 lg:text-xs dark:text-slate-400">
          Ajusta el tema, el tamaño de letra y el modo de vista para que el roadmap se adapte a ti.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
        <div className="space-y-2 lg:space-y-2.5">
          <p className="text-[11px] font-medium text-slate-700 lg:text-xs dark:text-slate-300">Tema</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "light", label: "Claro" },
              { value: "dark", label: "Oscuro" },
              { value: "system", label: "Sistema" }
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updatePreferences({ theme: opt.value as any })}
                className={`rounded-full px-3 py-1 text-[11px] lg:px-4 lg:py-1.5 lg:text-xs transition-all ${
                  preferences.theme === opt.value
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 lg:space-y-2.5">
          <p className="text-[11px] font-medium text-slate-700 lg:text-xs dark:text-slate-300">Tamaño de fuente</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "sm", label: "Compacto" },
              { value: "md", label: "Normal" },
              { value: "lg", label: "Grande" }
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updatePreferences({ fontScale: opt.value as any })}
                className={`rounded-full px-3 py-1 text-[11px] lg:px-4 lg:py-1.5 lg:text-xs transition-all ${
                  preferences.fontScale === opt.value
                    ? "bg-slate-300/80 text-slate-900 shadow-sm dark:bg-slate-200 dark:text-slate-900"
                    : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 lg:space-y-2.5">
          <p className="text-[11px] font-medium text-slate-700 lg:text-xs dark:text-slate-300">Color de acento</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "indigo", label: "Indigo" },
              { value: "emerald", label: "Verde" },
              { value: "rose", label: "Rosa" }
            ].map((opt) => {
              const accentGradients: Record<string, string> = {
                indigo: "from-indigo-500 to-purple-500",
                emerald: "from-emerald-500 to-teal-500",
                rose: "from-rose-500 to-pink-500"
              };
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => updatePreferences({ accentColor: opt.value as any })}
                  className={`rounded-full px-3 py-1 text-[11px] lg:px-4 lg:py-1.5 lg:text-xs transition-all ${
                    preferences.accentColor === opt.value
                      ? `bg-gradient-to-r ${accentGradients[opt.value]} text-white shadow-sm`
                      : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2 lg:space-y-2.5">
          <p className="text-[11px] font-medium text-slate-700 lg:text-xs dark:text-slate-300">Modo de vista</p>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "grid", label: "Grid (por defecto)" },
              { value: "timeline", label: "Timeline / Línea de tiempo" }
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updatePreferences({ viewMode: opt.value as any })}
                className={`rounded-full px-3 py-1 text-[11px] lg:px-4 lg:py-1.5 lg:text-xs transition-all ${
                  preferences.viewMode === opt.value
                    ? "bg-indigo-500 text-white shadow-sm"
                    : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <label className="mt-1 flex items-center gap-2 text-[11px] text-slate-700 lg:text-xs dark:text-slate-300">
            <input
              type="checkbox"
              checked={preferences.compactMode}
              onChange={(e) => updatePreferences({ compactMode: e.target.checked })}
              className="h-3.5 w-3.5 rounded border-slate-300 bg-white text-indigo-500 focus:ring-0 lg:h-4 lg:w-4 dark:border-slate-600 dark:bg-slate-900"
            />
            Modo compacto (más tarjetas en pantalla)
          </label>
        </div>
      </div>
    </section>
  );
};


