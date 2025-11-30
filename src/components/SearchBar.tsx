import { Search } from "lucide-react";
import { useRoadmapStore } from "../store/roadmapStore";

export const SearchBar = () => {
  const searchQuery = useRoadmapStore((s) => s.searchQuery);
  const setSearchQuery = useRoadmapStore((s) => s.setSearchQuery);

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar temas por nombre, categoría o etiqueta…"
        className="h-9 w-full rounded-full border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-500 outline-none ring-0 transition focus:border-indigo-500 focus:bg-white focus:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-500 dark:focus:bg-slate-900/80"
      />
    </div>
  );
};


