# Frontend Roadmap - React + Vite

Proyecto de roadmap interactivo diseñado para guiar y hacer seguimiento en el aprendizaje de Frontend. Construido con un stack moderno enfocado en la experiencia de usuario y animaciones fluidas.

![Screenshot de la app](link-a-tu-imagen.png) <!-- Reemplazar con una captura real -->

## Características Principales

* Mapa Interactivo: Navegación visual por las diferentes tecnologías y conceptos.
* Seguimiento de Progreso: Marca temas como completados o pendientes.
* Persistencia Local: Tus preferencias y progreso se guardan automáticamente en tu navegador usando localStorage.
* Estadísticas en Tiempo Real: Visualiza tu avance global en la ruta de aprendizaje.
* Búsqueda Integrada: Encuentra rápidamente nodos o temas específicos.
* Diseño Responsive y Animado: Interfaz adaptativa con transiciones suaves gracias a Framer Motion.

## Tecnologías Utilizadas

* Framework: React 18 + Vite + TypeScript
* Enrutamiento: React Router DOM v6
* Estilos: TailwindCSS (Mobile-first)
* Estado Global: Zustand
* Animaciones: Framer Motion
* Iconos: Lucide React

## Estructura del Proyecto

* src/data/roadmap.json: Definición inicial de los nodos del roadmap.
* src/store/roadmapStore.ts: Estado global (nodos, preferencias, estadísticas) con persistencia en localStorage.
* src/components/*: Componentes reutilizables (Header, RoadmapNode, SearchBar, etc.).
* src/pages/*: Vistas principales (RoadmapView, StatsPage, SettingsPage).
* src/styles/index.css: Configuración base de Tailwind y estilos utilitarios.

## Instalación y Uso

### Requisitos Previos
* Node.js (Versión 18 o superior recomendada)
* npm o yarn

### Desarrollo local

1. Clonar el repositorio e instalar las dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación se abrirá en http://localhost:5173.

### Otros Comandos Útiles

* npm run build: Compila la aplicación para producción.
* npm run preview: Previsualiza la build de producción localmente.
* npm run lint: Ejecuta ESLint para encontrar problemas en el código.
* npm run format: Formatea el código usando Prettier.

## Despliegue

Este proyecto incluye un archivo vercel.json con la configuración necesaria para despliegues limpios de React Router (evitando errores 404 al recargar páginas). Está optimizado para ser desplegado fácilmente en Vercel con solo vincular el repositorio.
