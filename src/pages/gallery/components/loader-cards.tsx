import type { LoaderColor } from "@/data/patterns";
import { LOADER_COLOR_CHILD_BG_500 } from "@/data/loader-colors";
import { LOADER_GRID_INDEXES } from "@/data/loader-grid";

interface LoaderCardProps {
  pattern: string;
  color?: LoaderColor;
}

export function LoaderCard({ pattern, color = "sky" }: LoaderCardProps) {
  const colorClass = LOADER_COLOR_CHILD_BG_500[color];
  return (
    <div className="loader-card flex items-center relative justify-center w-full aspect-square border border-neutral-800/30 p-4 ">
      <div
        className={`animated-loader  bloom ${pattern} grid grid-cols-3 ${colorClass} *:size-4  gap-0.5 w-fit`}
      >
        {LOADER_GRID_INDEXES.map((i) => (
          <div key={i} />
        ))}
      </div>
      <div className="text-xs text-neutral-800/90 absolute bottom-2 left-2">
        {pattern}
      </div>
    </div>
  );
}
