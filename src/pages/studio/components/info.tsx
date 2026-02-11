import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";

export default function Info() {
  return (
    <div className="fixed top-5 right-5 z-50 w-sm max-w-xs flex flex-col items-start justify-start gap-3 p-4 pointer-events-none">
      <Card className="w-full bg-neutral-900/95 border border-neutral-800 outline-none shadow-none pointer-events-auto">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white">
            Studio basics
          </CardTitle>
          <CardDescription className="text-[11px] text-neutral-400">
            A quick overview of how to shape a loader.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[11px] leading-relaxed text-neutral-300">
          <p>
            The 3×3 grid is your loader. Each square controls when that pixel
            lights up in the loop.
          </p>
          <p>
            Tap a square to cycle between{" "}
            <span className="font-semibold">0</span> (off) and{" "}
            <span className="font-semibold">1–9</span>. Lower numbers fire
            earlier in the animation, higher numbers fire later.
          </p>
          <p>
            Start from a preset pattern, then tweak the grid until it feels
            right for your loader.
          </p>
        </CardContent>
      </Card>

      <Card className="w-full bg-neutral-900/95 border border-neutral-800 outline-none shadow-none pointer-events-auto">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-white">
            Copy this loader
          </CardTitle>
          <CardDescription className="text-[11px] text-neutral-400">
            Code export is coming soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[11px] leading-relaxed text-neutral-300">
          <p className="text-neutral-400">
            You&apos;ll be able to grab a ready‑to‑paste snippet for this loader
            here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
