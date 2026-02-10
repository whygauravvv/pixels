import { Routes, Route } from "react-router-dom";
import { Gallery } from "./pages/gallery";
import { Studio } from "./pages/studio";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </>
  );
}

export default App;
