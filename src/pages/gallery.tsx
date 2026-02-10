import { useState } from "react";
import { BloomFilter } from "../components/BloomFilter";
import { LoaderCard } from "../components/LoaderCard";
import { PATTERNS } from "../data/patterns";

export function Gallery() {
  const [hoverOnly, setHoverOnly] = useState(false);

  return (
    <div
      className={`min-h-screen bg-black text-white py-10 px-6 ${
        hoverOnly ? "hover-only-animate" : ""
      }`}
    >
      <BloomFilter />

      <header className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-white">Loader patterns</h1>
        <p className="text-stone-500 text-sm mt-1">
          3×3 grid patterns with bloom
        </p>
        <label className="mt-4 inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={hoverOnly}
            onChange={(e) => setHoverOnly(e.target.checked)}
            className="rounded border-stone-500 bg-stone-800 text-sky-500 focus:ring-sky-500"
          />
          <span className="text-sm text-stone-400">
            Hover to animate (pause all otherwise)
          </span>
        </label>
      </header>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 justify-items-center max-w-6xl mx-auto">
        {PATTERNS.map(({ pattern, color }) => (
          <LoaderCard key={pattern} pattern={pattern} color={color} />
        ))}
      </div>
    </div>
  );
}
