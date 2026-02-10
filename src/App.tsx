import { Routes, Route } from "react-router-dom";
import { Gallery } from "./pages/gallery";
import { Studio } from "./pages/studio";
import Navbar from "./components/navbar";
import { SettingsProvider } from "./context/settings-context";

function App() {
  return (
    <SettingsProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </SettingsProvider>
  );
}

export default App;
