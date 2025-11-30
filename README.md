## Frontend Roadmap – React + Vite

Proyecto de roadmap interactivo para aprender Frontend, construido con **React + Vite + TypeScript**, **TailwindCSS**, **Zustand**, **React Router**, **Framer Motion** y **Lucide React**.

### Tecnologías principales

- **React + Vite + TypeScript**
- **React Router DOM** para navegación entre vistas
- **TailwindCSS** para estilos (mobile‑first, responsive)
- **Zustand** para estado global
- **localStorage** para persistir progreso y preferencias
- **Framer Motion** para animaciones clave
- **Lucide React** para iconos

### Estructura principal

- `src/data/roadmap.json`: definición inicial de los nodos del roadmap.
- `src/store/roadmapStore.ts`: estado global (nodos, preferencias, estadísticas) con persistencia en localStorage.
- `src/components/*`: Header, RoadmapNode, NodeDetailsModal, SearchBar, UserPreferencesPanel, FloatingActionMenu, etc.
- `src/pages/*`: `RoadmapView`, `StatsPage`, `SettingsPage`.
- `src/styles/index.css`: configuración base de Tailwind y estilos utilitarios.

### Comandos

```bash
npm install
npm run dev
```

La app se abrirá normalmente en `http://localhost:5173`.


