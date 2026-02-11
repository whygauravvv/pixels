import { BrushIcon, HomeIcon, type LucideIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { StudioControlsPanel } from "@/pages/studio/components/studio-controls-panel";
import BloomButton from "./bloom-button";
import PlayPauseButton from "./play-button";

const NAV_WRAPPER_SIZE = { width: 500, height: 300 } as const;

const STUDIO_LAYOUT = { scaleX: 1, scaleY: 1, borderRadius: 16 } as const;
const COMPACT_LAYOUT = {
  scaleX: 0.175,
  scaleY: 0.135,
  borderRadius: 100,
} as const;

const LAYOUT_TRANSITION = {
  duration: 0.4,
  type: "spring" as const,
};

const STUDIO_PANEL_TRANSITION = {
  duration: 0.1,
};

type NavItemProps = {
  to: string;
  icon: LucideIcon;
  label: string;
};

function NavItem({ to, icon: Icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        cn(
          "flex rounded-full p-1.5 shrink-0 items-center justify-center duration-200 group text-neutral-500",
          isActive && "text-white",
        )
      }
    >
      <Icon size={18} aria-hidden="true" />
    </NavLink>
  );
}

function NavbarRoutes() {
  const { pathname } = useLocation();
  const isStudio = pathname === "/studio";

  return (
    <div
      className="pointer-events-auto fixed bottom-3 items-stretch justify-center hidden md:flex"
      style={NAV_WRAPPER_SIZE}
    >
      <motion.div
        layout
        initial={false}
        style={{ originX: 0.5, originY: 1 }}
        animate={isStudio ? STUDIO_LAYOUT : COMPACT_LAYOUT}
        transition={LAYOUT_TRANSITION}
        className="absolute inset-0 bg-neutral-900 shadow-lg shadow-black/40"
      />

      <div className="relative z-10 h-full w-full py-1 px-2 flex flex-col items-stretch justify-end gap-2 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isStudio && (
            <motion.div
              key="studio-controls"
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              transition={STUDIO_PANEL_TRANSITION}
              className="m-1 p-2"
            >
              <StudioControlsPanel />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-1.5">
          <NavItem to="/" icon={HomeIcon} label="Home" />
          <NavItem to="/studio" icon={BrushIcon} label="Studio" />
        </div>
      </div>
    </div>
  );
}

function MobileNavbar() {
  return (
    <div className="flex items-center justify-center gap-1.5 bg-neutral-900 p-1 rounded-full md:hidden">
      <BloomButton />
      <PlayPauseButton />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-linear-to-t from-neutral-950 fixed bottom-0 left-0 z-50 flex items-center justify-center gap-1.5 pointer-events-none">
      <NavbarRoutes />
      <MobileNavbar />
    </nav>
  );
}
