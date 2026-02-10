import { useSettings } from "../context/settings-context";

export default function Navbar() {
  const { bloomEnabled, toggleBloom, hoverOnly, toggleHoverOnly } =
    useSettings();

  return (
    <nav className="w-full h-20 bg-linear-to-t from-neutral-950 fixed bottom-0 left-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-neutral-900 outline-1 outline-neutral-800/30 w-fit h-14 rounded-full flex items-center justify-center px-4 gap-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400">Bloom</span>
          <button
            type="button"
            onClick={toggleBloom}
            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
              bloomEnabled ? "bg-sky-500" : "bg-stone-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                bloomEnabled ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 whitespace-nowrap">
            Hover to animate
          </span>
          <button
            type="button"
            onClick={toggleHoverOnly}
            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors ${
              hoverOnly ? "bg-sky-500" : "bg-stone-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                hoverOnly ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
