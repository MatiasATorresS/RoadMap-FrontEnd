import { useMemo } from "react";
import { Filter, Star } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";

export const FiltersBar = () => {
  const nodes = useRoadmapStore((s) => s.nodes);
  const searchQuery = useRoadmapStore((s) => s.searchQuery);
  const setSearchQuery = useRoadmapStore((s) => s.setSearchQuery);

  // filtros simples derivados del searchQuery con prefijos
  const { statusFilter, favoritesOnly, categoryFilter } = useMemo(() => {
    const tokens = searchQuery.split(" ").filter(Boolean);
    let status: "pending" | "in-progress" | "completed" | "all" = "all";
    let fav = false;
    let category: string | undefined;

    const others: string[] = [];
    tokens.forEach((t) => {
      const lower = t.toLowerCase();
      if (lower === "is:pending") status = "pending";
      else if (lower === "is:progress") status = "in-progress";
      else if (lower === "is:completed") status = "completed";
      else if (lower === "is:fav" || lower === "is:favorite") fav = true;
      else if (lower.startsWith("cat:")) category = lower.slice(4);
      else others.push(t);
    });

    return {
      statusFilter: status,
      favoritesOnly: fav,
      categoryFilter: category,
      restQuery: others.join(" ")
    };
  }, [searchQuery]);

  const setRestQuery = (value: string) => {
    const baseParts = searchQuery
      .split(" ")
      .filter(
        (t) =>
          t.startsWith("is:") ||
          t.startsWith("cat:")
      );
    const parts = value ? [...baseParts, value] : baseParts;
    setSearchQuery(parts.join(" "));
  };

  const toggleStatus = (value: "all" | "pending" | "in-progress" | "completed") => {
    const parts = searchQuery.split(" ").filter(Boolean);
    const withoutStatus = parts.filter((p) => !p.startsWith("is:pending") && !p.startsWith("is:progress") && !p.startsWith("is:completed"));
    if (value === "all") {
      setSearchQuery(withoutStatus.join(" "));
    } else {
      setSearchQuery([...withoutStatus, `is:${value === "in-progress" ? "progress" : value}`].join(" "));
    }
  };

  const toggleFavorites = () => {
    const parts = searchQuery.split(" ").filter(Boolean);
    const hasFav = parts.some((p) => p === "is:fav" || p === "is:favorite");
    const filtered = parts.filter((p) => p !== "is:fav" && p !== "is:favorite");
    setSearchQuery(hasFav ? filtered.join(" ") : [...filtered, "is:fav"].join(" "));
  };

  const distinctCategories = Array.from(
    new Set(nodes.map((n) => n.category.toLowerCase()))
  );

  const toggleCategory = (cat?: string) => {
    const parts = searchQuery.split(" ").filter(Boolean);
    const withoutCat = parts.filter((p) => !p.startsWith("cat:"));
    if (!cat) {
      setSearchQuery(withoutCat.join(" "));
    } else {
      setSearchQuery([...withoutCat, `cat:${cat}`].join(" "));
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-300/60 bg-white p-2 text-[11px] text-slate-800 lg:p-3 lg:gap-2.5 lg:text-xs dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-400">
          <Filter className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
          <span>Filtros rápidos</span>
        </div>
        <button
          type="button"
          onClick={toggleFavorites}
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${
            favoritesOnly
              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200"
              : "bg-slate-200/60 text-slate-600 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
          }`}
        >
          <Star className="h-3 w-3" />
          Favoritos
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
        {[
          { value: "all", label: "Todos" },
          { value: "pending", label: "Pendientes" },
          { value: "in-progress", label: "En progreso" },
          { value: "completed", label: "Completados" }
        ].map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() =>
              toggleStatus(opt.value as "all" | "pending" | "in-progress" | "completed")
            }
            className={`rounded-full px-2.5 py-0.5 lg:px-3 lg:py-1 transition-all ${
              statusFilter === opt.value
                ? "bg-indigo-500 text-white shadow-sm"
                : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {distinctCategories.length > 1 && (
        <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
          <span className="mr-1 text-[10px] uppercase tracking-wide text-slate-700 lg:text-xs dark:text-slate-500">
            Categorías:
          </span>
          <button
            type="button"
            onClick={() => toggleCategory(undefined)}
            className={`rounded-full px-2 py-0.5 lg:px-2.5 lg:py-1 transition-all ${
              !categoryFilter
                ? "bg-slate-300/80 text-slate-800 shadow-sm dark:bg-slate-700 dark:text-slate-100"
                : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            Todas
          </button>
          {distinctCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategory(cat)}
              className={`rounded-full px-2 py-0.5 lg:px-2.5 lg:py-1 capitalize transition-all ${
                categoryFilter === cat
                ? "bg-indigo-500 text-white shadow-sm"
                : "bg-slate-200/60 text-slate-700 hover:bg-slate-300/80 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


