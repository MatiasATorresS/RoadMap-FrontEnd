import { Link, NavLink, useLocation } from "react-router-dom";
import { Moon, Sun, Map, BarChart3, Settings, Sparkles } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";

const navLinkBase =
  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200";

export const Header = () => {
  const location = useLocation();
  const preferences = useRoadmapStore((s) => s.preferences);
  const updatePreferences = useRoadmapStore((s) => s.updatePreferences);

  const accentGradient =
    preferences.accentColor === "emerald"
      ? "from-emerald-500 to-teal-500 shadow-emerald-500/40"
      : preferences.accentColor === "rose"
      ? "from-rose-500 to-pink-500 shadow-rose-500/40"
      : "from-indigo-500 to-purple-500 shadow-indigo-500/40";

  const toggleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["dark", "light", "system"];
    const currentIndex = themes.indexOf(preferences.theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    updatePreferences({ theme: themes[nextIndex] });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-300/60 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr text-slate-50 shadow-lg ${accentGradient}`}
          >
            <Map className="h-4 w-4" />
          </span>
          <div className="leading-tight min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-50 truncate hidden xs:block">Frontend Roadmap</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate hidden xs:block">Tu mapa interactivo de aprendizaje</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-xs sm:gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <Map className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Roadmap</span>
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <BarChart3 className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden lg:inline">Estadísticas</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${navLinkBase} ${
                isActive
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`
            }
          >
            <Settings className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden lg:inline">Ajustes</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-300/80 bg-slate-200/60 text-slate-700 shadow-sm hover:border-slate-400/80 hover:bg-slate-300/80 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-slate-100"
            aria-label={`Tema: ${preferences.theme}`}
            title={`Tema: ${preferences.theme === "system" ? "Sistema" : preferences.theme === "dark" ? "Oscuro" : "Claro"}`}
          >
            {preferences.theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : preferences.theme === "system" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <span className="hidden items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300 lg:inline-flex lg:px-3">
            <Sparkles className="h-3 w-3" />
            <span className="hidden xl:inline">
              {location.pathname === "/"
                ? "Consejo: marca los temas conforme avances"
                : "Explora tu progreso y personaliza tu ruta"}
            </span>
          </span>
        </div>
      </div>
    </header>
  );
};


