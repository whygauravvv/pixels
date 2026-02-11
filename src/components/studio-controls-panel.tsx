import type { LoaderColor } from "@/data/patterns";
import {
  useStudioSettings,
  DEFAULT_DURATION,
} from "@/context/studio-settings-context";

const COLORS: LoaderColor[] = ["sky", "amber", "rose", "emerald"];

const COLOR_ACTIVE_CLASS: Record<LoaderColor, string> = {
  sky: "bg-sky-500 text-white",
  amber: "bg-amber-500 text-white",
  rose: "bg-rose-500 text-white",
  emerald: "bg-emerald-500 text-white",
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
];

const DURATION_MIN = 100;
const DURATION_MAX = 5000;
const DURATION_STEP = 100;

export function StudioControlsPanel() {
  const { duration, color, setDuration, setColor, applyPresetFromDelays } =
    useStudioSettings();

  return (
    <div className="space-y-4 text-left overflow-hidden">
      {/* Start from an example */}
      <section>
        <h2 className="text-xs font-medium text-stone-400 mb-1">
          Start from an example
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(({ name, delays }) => (
            <button
              key={name}
              type="button"
              onClick={() => applyPresetFromDelays(delays)}
              className="px-2.5 py-1.5 rounded-md text-xs bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Animation duration */}
      <section>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-medium text-stone-400">
            Full cycle time
          </h2>
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
      </section>

      {/* Pick a color */}
      <section>
        <h2 className="text-xs font-medium text-stone-400 mb-1">
          Pick a color
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`capitalize px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
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
    </div>
  );
}
