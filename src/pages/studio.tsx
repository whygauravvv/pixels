import { useState, useCallback } from "react";
import { BloomFilter } from "../components/bloom-filter";
import type { LoaderColor } from "../data/patterns";

const COLORS: LoaderColor[] = ["sky", "amber", "rose", "emerald"];

const COLOR_ACTIVE_CLASS: Record<LoaderColor, string> = {
  sky: "bg-sky-500 text-white",
  amber: "bg-amber-500 text-white",
  rose: "bg-rose-500 text-white",
  emerald: "bg-emerald-500 text-white",
};

/** Step 0 = off, steps 1–9 = when it lights (1 first, 9 last). */
const MAX_STEP = 9;

/** Convert preset delays (ms, for 600ms cycle) to steps 1–9. */
function delaysToSteps(delays: number[], _durationMs: number = 600): number[] {
  return delays.map((d) =>
    d === 0 ? 1 : Math.min(MAX_STEP, Math.round((d / 600) * 8) + 1),
  );
}

/**
 * Step → delay in ms, compressed so that only the steps that are
 * actually used (across all cells) are spread across the full cycle.
 *
 * - step 0: off (no delay, handled separately)
 * - steps > 0: mapped to their rank among the used steps
 */
function stepToDelayMs(
  step: number,
  durationMs: number,
  allSteps: number[],
): number {
  if (step < 1) return 0;

  // Unique, sorted list of steps that are actually used (ignoring 0 / off).
  const usedSteps = Array.from(new Set(allSteps.filter((s) => s > 0))).sort(
    (a, b) => a - b,
  );

  if (usedSteps.length === 0) return 0;

  const index = usedSteps.indexOf(step);
  if (index === -1) return 0;

  if (usedSteps.length === 1) {
    // Only one active step: just fire at the start of the cycle.
    return 0;
  }

  const t = (index / (usedSteps.length - 1)) * durationMs;
  return t;
}

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
];

const INITIAL_STEPS: number[] = [1, 2, 3, 1, 2, 3, 1, 2, 3];

const DURATION_MIN = 100;
const DURATION_MAX = 5000;
const DURATION_STEP = 100;
const DEFAULT_DURATION = 600;

const COLOR_GLOW: Record<LoaderColor, string> = {
  sky: "bg-sky-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  emerald: "bg-emerald-400",
};

export function Studio() {
  const [steps, setSteps] = useState<number[]>(() => [...INITIAL_STEPS]);
  const [duration, setDuration] = useState(DEFAULT_DURATION);
  const [color, setColor] = useState<LoaderColor>("sky");

  const cycleCellStep = useCallback((index: number) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = (prev[index] + 1) % (MAX_STEP + 1);
      return next;
    });
  }, []);

  const applyPreset = useCallback((presetDelays: number[]) => {
    setSteps(delaysToSteps(presetDelays));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-10 px-6">
      <BloomFilter />

      <header className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-white">
          Create your own pattern
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          Tap each dot: set when it lights up (1–9) or turn it off (0).
        </p>
      </header>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Start from an example */}
        <section>
          <h2 className="text-sm font-medium text-stone-400 mb-2">
            Start from an example
          </h2>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(({ name, delays: presetDelays }) => (
              <button
                key={name}
                type="button"
                onClick={() => applyPreset(presetDelays)}
                className="px-3 py-1.5 rounded-md text-sm bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        {/* Animation duration */}
        <section>
          <h2 className="text-sm font-medium text-stone-400 mb-2">
            Full cycle time
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={DURATION_MIN}
              max={DURATION_MAX}
              step={DURATION_STEP}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="flex-1 h-2 rounded-lg appearance-none bg-stone-700 accent-sky-500"
            />
            <span className="text-sm font-mono text-stone-300 tabular-nums w-16">
              {duration}ms
            </span>
          </div>
        </section>

        {/* Pick a color */}
        <section>
          <h2 className="text-sm font-medium text-stone-400 mb-2">
            Pick a color
          </h2>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`capitalize px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  color === c
                    ? COLOR_ACTIVE_CLASS[c]
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-stone-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Combined: tap the dots to set step (0=off, 1–9) or cycle */}
        <section className="flex flex-col items-center">
          <p className="text-sm text-stone-400 mb-3">
            Tap a dot: 1–9 = when it lights up, 0 = off
          </p>
          <div className="animated-loader bloom grid grid-cols-3 gap-0.5 w-fit overflow-visible">
            {steps.map((step, index) => {
              const isOff = step === 0;
              const delayMs = stepToDelayMs(step, duration, steps);
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => cycleCellStep(index)}
                  className="relative flex items-center justify-center size-10 sm:size-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  title={
                    isOff
                      ? "Off — tap to turn on"
                      : `Step ${step} — tap to change or turn off`
                  }
                >
                  <div
                    className={`absolute inset-0 ${COLOR_GLOW[color]}`}
                    style={
                      isOff
                        ? { animation: "none", opacity: 0 }
                        : {
                            animation: `loader-pulse ${duration}ms ease-in-out infinite`,
                            animationDelay: `${delayMs}ms`,
                          }
                    }
                  />
                  <span className="relative z-10 text-xs font-semibold text-white/90 drop-shadow-sm">
                    {isOff ? "0" : step}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
