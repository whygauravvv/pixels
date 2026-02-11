import {
  useStudioSettings,
  stepToDelayMs,
} from "@/context/studio-settings-context";
import { useSettings } from "@/context/settings-context";
import { LOADER_COLOR_GLOW_400 } from "@/data/loader-colors";
import { BloomFilter } from "@/components/bloom-filter";
import Info from "./components/info";

export function Studio() {
  const { steps, duration, color, cycleCellStep } = useStudioSettings();
  const { hoverOnly } = useSettings();

  return (
    <div className=" bg-neutral-950 text-white p-10 h-[60vh]">
      <BloomFilter />
      <Info />
      <header className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center  gap-2 ">
            <img src="/logo.svg" alt="Pixels" className="w-6 h-6" />
            <h1 className="text-xl font-medium text-white tracking-tight">
              Pixels - Beautiful loaders for the web.
            </h1>
          </div>
          <p className="text-neutral-500 text-sm mt-1 max-w-sm">
            Create your own pixel loader pattern, customize it to your liking
            and copy the code to your project.
          </p>
        </div>
      </header>

      <div className="flex items-center justify-center w-full h-full">
        <div className="animated-loader bloom grid grid-cols-3 gap-0.5 w-fit overflow-visible">
          {steps.map((step, index) => {
            const isOff = step === 0;
            const delayMs = stepToDelayMs(step, duration, steps);
            return (
              <button
                key={index}
                type="button"
                onClick={() => cycleCellStep(index)}
                className="relative flex items-center justify-center size-24  focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                title={
                  isOff
                    ? "Off — tap to turn on"
                    : `Step ${step} — tap to change or turn off`
                }
              >
                <div
                  className={`absolute inset-0 rounded-xs ${LOADER_COLOR_GLOW_400[color]}`}
                  style={
                    isOff
                      ? { animation: "none", opacity: 0 }
                      : {
                          animation: `loader-pulse ${duration}ms ease-in-out infinite`,
                          animationDelay: `${delayMs}ms`,
                          animationPlayState: hoverOnly ? "paused" : "running",
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
      </div>
    </div>
  );
}
