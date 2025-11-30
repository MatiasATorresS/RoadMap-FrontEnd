import { useEffect } from "react";
import { useRoadmapStore } from "../store/roadmapStore";

export const useTheme = () => {
  const theme = useRoadmapStore((s) => s.preferences.theme);
  const fontScale = useRoadmapStore((s) => s.preferences.fontScale);

  useEffect(() => {
    const root = window.document.documentElement;

    // Manejo del tema
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effectiveTheme = theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

    if (effectiveTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Manejo del tamaño de fuente
    root.classList.remove("font-sm", "font-md", "font-lg");
    if (fontScale === "sm") {
      root.classList.add("font-sm");
    } else if (fontScale === "lg") {
      root.classList.add("font-lg");
    } else {
      root.classList.add("font-md");
    }

    // Listener para cambios del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        if (mediaQuery.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, fontScale]);
};


