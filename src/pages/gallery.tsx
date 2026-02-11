import { useSettings } from "@/context/settings-context";
import { BloomFilter } from "../components/bloom-filter";
import { LoaderCard } from "../components/loader-cards";
import { PATTERNS } from "../data/patterns";
import { PlayPauseIcon } from "@/assets/PlayPauseIcon";
import { Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Gallery() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-10 overscroll-y-none">
      <BloomFilter />

      <header className="mb-10 flex items-center justify-between">
        <div>
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
        </div>

        <div className="flex items-center gap-2">
          <BloomButton />
          <PlayPauseButton />
        </div>
      </header>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6  justify-items-center mx-auto">
        {PATTERNS.map(({ pattern, color }) => (
          <LoaderCard key={pattern} pattern={pattern} color={color} />
        ))}
      </div>
    </div>
  );
}

function BloomButton() {
  const { bloomEnabled, toggleBloom } = useSettings();

  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={toggleBloom}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 outline-none ring-neutral-600 transition-colors hover:bg-neutral-700 focus-visible:ring-2"
          aria-label={bloomEnabled ? "Turn off bloom" : "Turn on bloom"}
        >
          <Lightbulb
            size={20}
            className={`shrink-0 transition-colors ${
              bloomEnabled ? "text-yellow-400" : "text-neutral-500"
            }`}
            style={bloomEnabled ? { filter: "url(#bloom)" } : undefined}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {bloomEnabled ? "Turn off bloom" : "Make it Glow!"}
      </TooltipContent>
    </Tooltip>
  );
}

function PlayPauseButton() {
  const { hoverOnly, toggleHoverOnly } = useSettings();
  // "Playing" = not hover-only (animations run automatically)
  const isPlaying = !hoverOnly;

  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={toggleHoverOnly}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 outline-none ring-neutral-600 transition-colors hover:bg-neutral-700 focus-visible:ring-2"
          aria-label={
            isPlaying
              ? "Pause animations (hover to animate)"
              : "Play animations"
          }
        >
          <PlayPauseIcon isPlaying={isPlaying} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {isPlaying ? "Pause animations" : "Play animations"}
      </TooltipContent>
    </Tooltip>
  );
}
