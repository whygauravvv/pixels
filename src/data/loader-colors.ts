import type { LoaderColor } from "./patterns";

// Canonical list of loader colors used across the app.
export const LOADER_COLORS: LoaderColor[] = [
  "sky",
  "amber",
  "rose",
  "emerald",
  "violet",
  "cyan",
  "lime",
  "fuchsia",
];

// Solid background swatch (used for color picker chips etc.).
export const LOADER_COLOR_BG_500: Record<LoaderColor, string> = {
  sky: "bg-sky-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  emerald: "bg-emerald-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
  lime: "bg-lime-500",
  fuchsia: "bg-fuchsia-500",
};

// Glow background used in the studio 3×3 grid preview.
export const LOADER_COLOR_GLOW_400: Record<LoaderColor, string> = {
  sky: "bg-sky-400",
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
  cyan: "bg-cyan-400",
  lime: "bg-lime-400",
  fuchsia: "bg-fuchsia-400",
};

// Tailwind "apply to all children" color classes for the 3×3 grids.
export const LOADER_COLOR_CHILD_BG_400: Record<LoaderColor, string> = {
  sky: "*:bg-sky-400",
  amber: "*:bg-amber-400",
  rose: "*:bg-rose-400",
  emerald: "*:bg-emerald-400",
  violet: "*:bg-violet-400",
  cyan: "*:bg-cyan-400",
  lime: "*:bg-lime-400",
  fuchsia: "*:bg-fuchsia-400",
};

export const LOADER_COLOR_CHILD_BG_500: Record<LoaderColor, string> = {
  sky: "*:bg-sky-500",
  amber: "*:bg-amber-500",
  rose: "*:bg-rose-500",
  emerald: "*:bg-emerald-500",
  violet: "*:bg-violet-500",
  cyan: "*:bg-cyan-500",
  lime: "*:bg-lime-500",
  fuchsia: "*:bg-fuchsia-500",
};

