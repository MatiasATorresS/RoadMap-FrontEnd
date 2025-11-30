import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { RoadmapView } from "./pages/RoadmapView";
import { StatsPage } from "./pages/StatsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { FloatingActionMenu } from "./components/FloatingActionMenu";
import { useTheme } from "./hooks/useTheme";

export const App = () => {
  useTheme();

  return (
    <div className="app-shell flex min-h-screen flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<RoadmapView />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <FloatingActionMenu />
    </div>
  );
};


