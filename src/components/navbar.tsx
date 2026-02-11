import { BrushIcon, HomeIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { StudioControlsPanel } from "./studio-controls-panel";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-linear-to-t from-neutral-950 fixed bottom-0 left-0 z-50 flex items-center justify-center gap-1.5 pointer-events-none">
      <NavbarRoutes />
    </nav>
  );
}

function NavbarRoutes() {
  const location = useLocation();
  const isStudio = location.pathname === "/studio";

  return (
    <div
      className="pointer-events-auto fixed bottom-3 flex items-stretch justify-center"
      style={{ width: 500, height: 300 }}
    >
      <motion.div
        layout
        style={{ originX: 0.5, originY: 1 }}
        animate={
          isStudio
            ? { scaleX: 1, scaleY: 1, borderRadius: 16 }
            : { scaleX: 0.175, scaleY: 0.135, borderRadius: 100 }
        }
        transition={{
          duration: 0.4,
          type: "spring",
        }}
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
              transition={{ duration: 0.1 }}
              className="m-1 p-2"
            >
              <StudioControlsPanel />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-1.5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex rounded-full p-1.5 shrink-0 items-center justify-center duration-200 group text-neutral-500",
                isActive && "text-white",
              )
            }
          >
            <HomeIcon size={18} />
          </NavLink>
          <NavLink
            to="/studio"
            className={({ isActive }) =>
              cn(
                "flex rounded-full p-1.5 shrink-0 items-center justify-center duration-200 group text-neutral-500",
                isActive && "text-white",
              )
            }
          >
            <BrushIcon size={18} />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
