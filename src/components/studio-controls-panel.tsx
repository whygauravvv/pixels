import { useState } from "react";
import type { LoaderColor } from "@/data/patterns";
import {
  useStudioSettings,
  DEFAULT_DURATION,
} from "@/context/studio-settings-context";
import { useSettings } from "@/context/settings-context";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { PlayPauseIcon } from "@/assets/PlayPauseIcon";

const COLORS: LoaderColor[] = [
  "sky",
  "amber",
  "rose",
  "emerald",
  "violet",
  "cyan",
  "lime",
  "fuchsia",
];

const COLOR_BG_CLASS: Record<LoaderColor, string> = {
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  lime: "bg-lime-500",
  fuchsia: "bg-fuchsia-500",
};

const PRESETS: { name: string; delays: number[] }[] = [
  { name: "Pulse", delays: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  {
    name: "Wave L→R",
    delays: [0, 100, 200, 0, 100, 200, 0, 100, 200],
  },
  {
    name: "Wave T→B",
    delays: [0, 0, 0, 100, 100, 100, 200, 200, 200],
  },
  {
    name: "Center out",
    delays: [200, 100, 200, 100, 0, 100, 200, 100, 200],
  },
  {
    name: "Diagonal",
    delays: [0, 100, 200, 100, 200, 300, 200, 300, 400],
  },
  {
    name: "Ripple out",
    delays: [0, 150, 300, 150, 300, 450, 300, 450, 600],
  },
  {
    name: "Ripple in",
    delays: [600, 450, 300, 450, 300, 150, 300, 150, 0],
  },
  {
    name: "Cross",
    delays: [0, 200, 0, 200, 0, 200, 0, 200, 0],
  },
  {
    name: "Corners",
    delays: [0, 250, 0, 250, 500, 250, 0, 250, 0],
  },
];

const VISIBLE_PRESETS = PRESETS.slice(0, 4);

const DURATION_MIN = 100;
const DURATION_MAX = 5000;
const DURATION_STEP = 100;

export function StudioControlsPanel() {
  const { duration, color, setDuration, setColor, applyPresetFromDelays } =
    useStudioSettings();
  const [activePreset, setActivePreset] = useState<string | null>(null);

  return (
    <div className="space-y-3 text-left overflow-hidden px-2.5 py-2 text-xs">
      {/* Start from an example */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-medium text-stone-300">
            Start from an example
          </h2>
          {activePreset && (
            <span className="text-[10px] text-stone-500">
              Using{" "}
              <span className="font-medium text-stone-300">{activePreset}</span>
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {VISIBLE_PRESETS.map(({ name, delays }) => (
            <button
              key={name}
              type="button"
              onClick={() => {
                applyPresetFromDelays(delays);
                setActivePreset(name);
              }}
              className={`px-2.5 py-1.5 rounded-md border text-xs transition-colors ${
                activePreset === name
                  ? "bg-stone-900/90 border-stone-500 text-stone-50"
                  : "bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700 hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-md border text-xs bg-stone-900 border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white"
              >
                More
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              align="center"
              className="w-56 border border-stone-800 bg-neutral-900 px-3 py-2"
            >
              <PopoverHeader className="mb-2">
                <PopoverTitle className="text-xs text-stone-200">
                  All patterns
                </PopoverTitle>
                <PopoverDescription className="text-[11px] text-stone-500">
                  Tap a pattern to apply it.
                </PopoverDescription>
              </PopoverHeader>
              <div className="grid grid-cols-2 gap-1.5">
                {PRESETS.map(({ name, delays }) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      applyPresetFromDelays(delays);
                      setActivePreset(name);
                    }}
                    className={`px-2 py-1 rounded-md border text-[11px] text-left transition-colors ${
                      activePreset === name
                        ? "bg-stone-900/90 border-stone-500 text-stone-50"
                        : "bg-stone-800 border-stone-700 text-stone-300 hover:bg-stone-700 hover:text-white"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p className="mt-1 text-[10px] text-stone-500">
          Tap a preset, then fine‑tune below.
        </p>
      </section>

      {/* Animation duration */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-medium text-stone-400">Cycle length</h2>
          <span className="text-[10px] font-mono text-stone-400 tabular-nums">
            {duration || DEFAULT_DURATION}ms
          </span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={DURATION_MIN}
            max={DURATION_MAX}
            step={DURATION_STEP}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="flex-1 h-1.5 rounded-lg appearance-none bg-stone-700 accent-sky-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-500">Faster</span>
          <span className="text-[10px] text-stone-500">Slower</span>
        </div>
      </section>

      {/* Pick a color */}
      <section className="pt-2 mt-1 border-t border-stone-800/80">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-medium text-stone-400">Pick a color</h2>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Choose loader color"
                  className={`size-10 rounded-full border border-stone-700 shadow-sm transition-transform hover:scale-105 ${COLOR_BG_CLASS[color]}`}
                />
              </PopoverTrigger>
              <PopoverContent
                side="top"
                align="center"
                className="w-auto border border-stone-800 bg-neutral-900 px-3 py-2"
              >
                <PopoverHeader className="mb-2">
                  <PopoverTitle className="text-xs text-stone-200">
                    Pick a color
                  </PopoverTitle>
                  <PopoverDescription className="text-[11px] text-stone-500">
                    Tap a dot to update the loader.
                  </PopoverDescription>
                </PopoverHeader>
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      aria-label={c}
                      className={`size-8 rounded-full border transition-transform hover:scale-105 ${COLOR_BG_CLASS[c]} ${
                        color === c
                          ? "ring-2 ring-sky-400 border-transparent"
                          : "border-stone-700"
                      }`}
                    />
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-medium text-stone-200 capitalize">
                {color}
              </span>
              <span className="text-[10px] text-stone-500">Loader color</span>
            </div>
          </div>

          <PlayPauseButton />
        </div>
      </section>
    </div>
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
