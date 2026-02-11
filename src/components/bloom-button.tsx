import { useSettings } from "@/context/settings-context";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Lightbulb } from "lucide-react";

export default function BloomButton() {
  const { bloomEnabled, toggleBloom } = useSettings();

  return (
    <Tooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={toggleBloom}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 outline-none ring-neutral-600 transition-colors hover:bg-neutral-700 focus-visible:ring-2"
          aria-label={bloomEnabled ? "Turn off bloom" : "Turn on bloom"}
        >
          <Lightbulb
            size={20}
            className={`shrink-0 transition-colors ${
              bloomEnabled ? "text-yellow-400" : "text-neutral-500"
            }`}
            style={bloomEnabled ? { filter: "url(#bloom)" } : undefined}
          />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {bloomEnabled ? "Turn off bloom" : "Make it Glow!"}
      </TooltipContent>
    </Tooltip>
  );
}
