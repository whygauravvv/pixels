import { BloomFilter } from "../components/bloom-filter";
import { LoaderCard } from "../components/loader-cards";
import { PATTERNS } from "../data/patterns";

export function Gallery() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10 overscroll-y-none">
      {/* Very performance heavy, so disabled by default */}
      <BloomFilter />

      <header className="mb-10">
        <div className="flex items-center  gap-2 ">
          <img src="/logo.svg" alt="Pixels" className="w-6 h-6" />
          <h1 className="text-xl font-medium text-white tracking-tight">
            Pixels - Beautiful loaders for the web.
          </h1>
        </div>
        <p className="text-neutral-500 text-sm mt-1 max-w-sm">
          Beautiful vanilla css loaders you can use in your web proejcts.
          Generate your own loader too in a few clicks.
        </p>
      </header>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6  justify-items-center mx-auto">
        {PATTERNS.map(({ pattern, color }) => (
          <LoaderCard key={pattern} pattern={pattern} color={color} />
        ))}
      </div>
    </div>
  );
}
