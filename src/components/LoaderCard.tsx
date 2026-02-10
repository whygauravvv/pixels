import type { LoaderColor } from "../data/patterns";

const COLOR_CLASS: Record<LoaderColor, string> = {
  sky: "*:bg-sky-400",
  amber: "*:bg-amber-400",
  rose: "*:bg-rose-400",
  emerald: "*:bg-emerald-400",
};

interface LoaderCardProps {
  pattern: string;
  color?: LoaderColor;
}

const CELLS = Array.from({ length: 9 }, (_, i) => i);

export function LoaderCard({ pattern, color = "sky" }: LoaderCardProps) {
  const colorClass = COLOR_CLASS[color];
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animated-loader bloom ${pattern} grid grid-cols-3 ${colorClass} *:size-3  gap-0.5 w-fit`}
      >
        {CELLS.map((i) => (
          <div key={i} />
        ))}
      </div>
      <span className="text-xs text-stone-400">{pattern}</span>
    </div>
  );
}
