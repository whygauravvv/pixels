import type { LoaderColor } from "../data/patterns";

const COLOR_CLASS: Record<LoaderColor, string> = {
  sky: "*:bg-sky-500",
  amber: "*:bg-amber-500",
  rose: "*:bg-rose-500",
  emerald: "*:bg-emerald-500",
  violet: "*:bg-violet-500",
  cyan: "*:bg-cyan-500",
  lime: "*:bg-lime-500",
  fuchsia: "*:bg-fuchsia-500",
};

interface LoaderCardProps {
  pattern: string;
  color?: LoaderColor;
}

const CELLS = Array.from({ length: 9 }, (_, i) => i);

export function LoaderCard({ pattern, color = "sky" }: LoaderCardProps) {
  const colorClass = COLOR_CLASS[color];
  return (
    <div className="flex items-center relative justify-center w-full aspect-square border border-neutral-800/30 p-4 ">
      <div
        className={`animated-loader  bloom ${pattern} grid grid-cols-3 ${colorClass} *:size-4  gap-0.5 w-fit`}
      >
        {CELLS.map((i) => (
          <div key={i} />
        ))}
      </div>
      <div className="text-xs text-neutral-800/90 absolute bottom-2 left-2">
        {pattern}
      </div>
    </div>
  );
}
