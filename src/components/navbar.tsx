import { BrushIcon, HomeIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <nav className="w-full h-20 bg-linear-to-t from-neutral-950 fixed bottom-0 left-0 z-50 flex items-center justify-center gap-1.5 pointer-events-none">
      <NavbarRoutes />
    </nav>
  );
}

function NavbarRoutes() {
  const location = useLocation();
  return (
    <motion.div
      animate={
        location.pathname === "/studio"
          ? { width: 360, height: 180, borderRadius: 20 }
          : { width: 80, height: 40, borderRadius: 50 }
      }
      transition={{
        duration: 0.4,
        type: "spring",
      }}
      className="bg-neutral-900 w-20 h-10 py-1 flex items-end justify-center px-2 gap-1 pointer-events-auto fixed bottom-3"
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          cn(
            "flex  rounded-full p-1.5 shrink-0 items-center justify-center duration-200 group text-neutral-500",
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
            "flex  rounded-full p-1.5 shrink-0 items-center justify-center duration-200 group text-neutral-500",
            isActive && "text-white",
          )
        }
      >
        <BrushIcon size={18} />
      </NavLink>
    </motion.div>
  );
}
