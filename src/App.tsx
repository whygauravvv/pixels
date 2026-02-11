import { Routes, Route } from "react-router-dom";
import { Gallery } from "./pages/gallery/gallery";
import { Studio } from "./pages/studio/studio";
import Navbar from "@/components/navbar";
import { SettingsProvider } from "./context/settings-context";
import { StudioSettingsProvider } from "./context/studio-settings-context";

function App() {
  return (
    <SettingsProvider>
      <StudioSettingsProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/studio" element={<Studio />} />
        </Routes>
      </StudioSettingsProvider>
    </SettingsProvider>
  );
}

export default App;
