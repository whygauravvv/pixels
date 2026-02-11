export type LoaderColor =
  | "sky"
  | "amber"
  | "rose"
  | "emerald"
  | "violet"
  | "cyan"
  | "lime"
  | "fuchsia";

export interface PatternEntry {
  pattern: string;
  color: LoaderColor;
}

export const PATTERNS: PatternEntry[] = [
  { pattern: "wave-lr", color: "sky" },
  { pattern: "wave-rl", color: "sky" },
  { pattern: "wave-tb", color: "amber" },
  { pattern: "wave-bt", color: "amber" },
  { pattern: "wave-btt", color: "rose" },
  { pattern: "pulse", color: "rose" },
  { pattern: "diagonal", color: "emerald" },
  { pattern: "diagonal-tl", color: "sky" },
  { pattern: "diagonal-tr", color: "amber" },
  { pattern: "diagonal-bl", color: "rose" },
  { pattern: "diagonal-br", color: "emerald" },
  { pattern: "center-out", color: "sky" },
  { pattern: "ripple-out", color: "sky" },
  { pattern: "ripple-in", color: "amber" },
  { pattern: "cross", color: "rose" },
  { pattern: "x-shape", color: "emerald" },
  { pattern: "diamond", color: "sky" },
  { pattern: "corners-only", color: "amber" },
  { pattern: "corners-sync", color: "rose" },
  { pattern: "stripes-h", color: "emerald" },
  { pattern: "stripes-v", color: "sky" },
  { pattern: "checkerboard", color: "amber" },
  { pattern: "rows-alt", color: "rose" },
  { pattern: "spiral-cw", color: "emerald" },
  { pattern: "spiral-ccw", color: "sky" },
  { pattern: "snake", color: "amber" },
  { pattern: "snake-rev", color: "rose" },
  { pattern: "rain", color: "emerald" },
  { pattern: "rain-rev", color: "sky" },
  { pattern: "waterfall", color: "amber" },
  { pattern: "breathing", color: "rose" },
  { pattern: "heartbeat", color: "emerald" },
  { pattern: "twinkle", color: "sky" },
  { pattern: "sparkle", color: "amber" },
  { pattern: "chaos", color: "rose" },
  { pattern: "edge-cw", color: "emerald" },
  { pattern: "border", color: "sky" },
  { pattern: "solo-center", color: "amber" },
  { pattern: "solo-tl", color: "rose" },
  { pattern: "solo-br", color: "emerald" },
  { pattern: "line-h-top", color: "sky" },
  { pattern: "line-h-mid", color: "amber" },
  { pattern: "line-h-bot", color: "rose" },
  { pattern: "line-v-left", color: "emerald" },
  { pattern: "line-v-mid", color: "sky" },
  { pattern: "line-v-right", color: "amber" },
  { pattern: "line-diag-1", color: "rose" },
  { pattern: "line-diag-2", color: "emerald" },
  { pattern: "plus-hollow", color: "sky" },
  { pattern: "L-tl", color: "amber" },
  { pattern: "L-tr", color: "rose" },
  { pattern: "L-bl", color: "emerald" },
  { pattern: "L-br", color: "sky" },
  { pattern: "T-top", color: "amber" },
  { pattern: "T-bot", color: "rose" },
];
