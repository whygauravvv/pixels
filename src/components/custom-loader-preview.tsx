import type { LoaderColor } from "../data/patterns";

const COLOR_CLASS: Record<LoaderColor, string> = {
  sky: "*:bg-sky-400",
  amber: "*:bg-amber-400",
  rose: "*:bg-rose-400",
  emerald: "*:bg-emerald-400",
  violet: "*:bg-violet-400",
  cyan: "*:bg-cyan-400",
  lime: "*:bg-lime-400",
  fuchsia: "*:bg-fuchsia-400",
};

interface CustomLoaderPreviewProps {
  delays: number[];
  color: LoaderColor;
}

const CELL_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export function CustomLoaderPreview({ delays, color }: CustomLoaderPreviewProps) {
  const colorClass = COLOR_CLASS[color];
  return (
    <div
      className={`animated-loader bloom grid grid-cols-3 ${colorClass} gap-0.5 w-fit *:size-3`}
    >
      {CELL_INDEXES.map((i) => (
        <div
          key={i}
          style={{ animationDelay: `${delays[i] ?? 0}ms` }}
        />
      ))}
    </div>
  );
}
