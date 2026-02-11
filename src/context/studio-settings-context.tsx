import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LoaderColor } from "@/data/patterns";

/** Step 0 = off, steps 1–9 = when it lights (1 first, 9 last). */
export const MAX_STEP = 9;

/** Default full cycle duration in milliseconds. */
export const DEFAULT_DURATION = 600;

/** Initial 3×3 pattern used when the studio first loads. */
const INITIAL_STEPS: number[] = [1, 2, 3, 1, 2, 3, 1, 2, 3];

/**
 * Convert preset delays (ms, for a 600ms cycle) to steps 1–9.
 *
 * This lets presets be expressed in absolute time but stored in the UI
 * as discrete "when in the sequence" steps.
 */
export function delaysToSteps(
  delays: number[],
  _durationMs: number = DEFAULT_DURATION,
): number[] {
  return delays.map((d) =>
    d === 0 ? 1 : Math.min(MAX_STEP, Math.round((d / 600) * 8) + 1),
  );
}

/**
 * Step → delay in ms, compressed so that only the steps that are
 * actually used (across all cells) are spread across the full cycle.
 *
 * - step 0: off (no delay, handled separately)
 * - steps > 0: mapped to their rank among the used steps
 */
export function stepToDelayMs(
  step: number,
  durationMs: number,
  allSteps: number[],
): number {
  if (step < 1) return 0;

  // Unique, sorted list of steps that are actually used (ignoring 0 / off).
  const usedSteps = Array.from(new Set(allSteps.filter((s) => s > 0))).sort(
    (a, b) => a - b,
  );

  if (usedSteps.length === 0) return 0;

  const index = usedSteps.indexOf(step);
  if (index === -1) return 0;

  if (usedSteps.length === 1) {
    // Only one active step: just fire at the start of the cycle.
    return 0;
  }

  const t = (index / (usedSteps.length - 1)) * durationMs;
  return t;
}

type StudioSettingsContextValue = {
  /** Per‑cell steps 0–9 describing when each dot lights up in the cycle. */
  steps: number[];
  /** Full animation cycle duration in milliseconds. */
  duration: number;
  /** Active loader color. */
  color: LoaderColor;

  /** Change the full cycle duration (e.g. slider). */
  setDuration: (value: number) => void;
  /** Change the active color (e.g. color pill). */
  setColor: (color: LoaderColor) => void;

  /**
   * Advance the step for a given cell, cycling through 0–9.
   * Used when tapping a cell in the 3×3 grid.
   */
  cycleCellStep: (index: number) => void;

  /**
   * Apply a preset defined as an array of absolute delays (ms) for each cell.
   * These delays are mapped into the discrete step system.
   */
  applyPresetFromDelays: (presetDelays: number[]) => void;
};

const StudioSettingsContext = createContext<StudioSettingsContextValue | null>(
  null,
);

export function StudioSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [steps, setSteps] = useState<number[]>(() => [...INITIAL_STEPS]);
  const [duration, setDuration] = useState<number>(DEFAULT_DURATION);
  const [color, setColor] = useState<LoaderColor>("sky");

  const cycleCellStep = useCallback((index: number) => {
    setSteps((prev) => {
      const next = [...prev];
      next[index] = (prev[index] + 1) % (MAX_STEP + 1);
      return next;
    });
  }, []);

  const applyPresetFromDelays = useCallback((presetDelays: number[]) => {
    setSteps(delaysToSteps(presetDelays));
  }, []);

  const value: StudioSettingsContextValue = useMemo(
    () => ({
      steps,
      duration,
      color,
      setDuration,
      setColor,
      cycleCellStep,
      applyPresetFromDelays,
    }),
    [steps, duration, color, cycleCellStep, applyPresetFromDelays],
  );

  return (
    <StudioSettingsContext.Provider value={value}>
      {children}
    </StudioSettingsContext.Provider>
  );
}

export function useStudioSettings(): StudioSettingsContextValue {
  const ctx = useContext(StudioSettingsContext);
  if (!ctx) {
    throw new Error(
      "useStudioSettings must be used within a StudioSettingsProvider",
    );
  }
  return ctx;
}

