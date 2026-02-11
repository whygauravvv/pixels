import { useSettings } from "@/context/settings-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { PlayPauseIcon } from "@/assets/PlayPauseIcon";

export default function PlayPauseButton() {
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
