import { useEffect, useState } from "react";

export default function Navbar() {
  const [bloomEnabled, setBloomEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    if (bloomEnabled) {
      root.classList.remove("bloom-disabled");
    } else {
      root.classList.add("bloom-disabled");
    }
  }, [bloomEnabled]);

  return (
    <nav className="w-full h-20 bg-linear-to-t from-neutral-950 fixed bottom-0 left-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-neutral-900 outline-1 outline-neutral-800/30 w-fit h-14 rounded-full flex items-center justify-center px-4 gap-3 pointer-events-auto">
        <span className="text-xs text-stone-400">Bloom</span>
        <button
          type="button"
          onClick={() => setBloomEnabled((prev) => !prev)}
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
    </nav>
  );
}
