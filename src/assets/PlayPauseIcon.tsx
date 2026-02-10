import { motion } from "motion/react";

const SIZE = 20;
const VBX = 24;
const c = (n: number) => (n / 24) * VBX;

// Play: triangle
const playPath = `M ${c(7)} ${c(6)} L ${c(7)} ${c(18)} L ${c(18)} ${c(12)} Z`;
// Pause: two vertical bars
const pausePathLeft = `M ${c(8)} ${c(6)} L ${c(11)} ${c(6)} L ${c(11)} ${c(18)} L ${c(8)} ${c(18)} Z`;
const pausePathRight = `M ${c(13)} ${c(6)} L ${c(16)} ${c(6)} L ${c(16)} ${c(18)} L ${c(13)} ${c(18)} Z`;

export function PlayPauseIcon({ isPlaying }: { isPlaying: boolean }) {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${VBX} ${VBX}`}
      fill="currentColor"
      className="shrink-0"
      aria-hidden
    >
      <g className="origin-center">
        <motion.path
          d={playPath}
          fill="currentColor"
          initial={false}
          animate={{
            opacity: isPlaying ? 0 : 1,
            scale: isPlaying ? 0.6 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ transformOrigin: "12px 12px" }}
        />
        <motion.g
          initial={false}
          animate={{
            opacity: isPlaying ? 1 : 0,
            scale: isPlaying ? 1 : 0.6,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ transformOrigin: "12px 12px" }}
        >
          <path d={pausePathLeft} fill="currentColor" />
          <path d={pausePathRight} fill="currentColor" />
        </motion.g>
      </g>
    </svg>
  );
}
