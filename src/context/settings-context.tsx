import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type SettingsContextValue = {
  bloomEnabled: boolean;
  setBloomEnabled: (value: boolean) => void;
  toggleBloom: () => void;
  hoverOnly: boolean;
  setHoverOnly: (value: boolean) => void;
  toggleHoverOnly: () => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(
  undefined,
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Match existing defaults: bloom off by default, hover-only on by default.
  const [bloomEnabled, setBloomEnabled] = useState(false);
  const [hoverOnly, setHoverOnly] = useState(true);

  // Keep the root element's classes in sync with bloom setting.
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    if (bloomEnabled) {
      root.classList.remove("bloom-disabled");
    } else {
      root.classList.add("bloom-disabled");
    }
  }, [bloomEnabled]);

  // Keep the root element's classes in sync with hover-only animation setting.
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;

    if (hoverOnly) {
      root.classList.add("hover-only-animate");
    } else {
      root.classList.remove("hover-only-animate");
    }
  }, [hoverOnly]);

  const value: SettingsContextValue = {
    bloomEnabled,
    setBloomEnabled,
    toggleBloom: () => setBloomEnabled((prev) => !prev),
    hoverOnly,
    setHoverOnly,
    toggleHoverOnly: () => setHoverOnly((prev) => !prev),
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}

