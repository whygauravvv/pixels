# Loader customization ideas

Ways to extend and customize the 3×3 loader system. Pick any combination; order is by area, not priority.

---

## Visual

- **Colors** – Add more options (e.g. violet, cyan, white) to the `COLOR_CLASS` map and `LoaderColor` type. You could also do gradients or different colors per cell for one pattern.
- **Cell size** – Currently `*:size-2`. Make it a prop (e.g. `sm` / `md` / `lg`) or global setting and map to `size-1.5`, `size-2`, `size-3`, etc.
- **Shape** – Cells are squares. Use `rounded-sm`, `rounded-md`, or `rounded-full` for circles.
- **Gap** – Change `gap-0.5` to `gap-1` or `gap-0` for a tighter or looser grid.
- **Bloom** – In the SVG filter, tweak `slope` / `intercept` (how much counts as “bright”) and the two `stdDeviation` values (blur strength). That gives stronger/softer or wider/narrower glow without touching the rest of the app.

---

## Animation

- **Duration** – The 600ms is hardcoded. Drive it with a CSS variable (e.g. `--loader-duration`) or a prop so you can offer “slow / normal / fast” (e.g. 400ms, 600ms, 1000ms).
- **Easing** – Swap `ease-in-out` for `linear`, `ease-in`, `ease-out`, or a custom `cubic-bezier(...)` for a different feel.
- **Opacity range** – Keyframes go 0 → 1 → 0. Use variables like `--opacity-min` / `--opacity-max` (e.g. 0.3 → 1) for a subtler pulse.
- **Stagger scale** – Delays are 0 / 100 / 200ms etc. Scale them (e.g. 50 / 100 / 150 or 150 / 300 / 450) so the wave feels snappier or slower without changing the pattern logic.

---

## Patterns and behavior

- **New patterns** – Add more delay/visibility rules in CSS (e.g. figure-8, zigzag, “random” delays) and new entries in `PATTERNS`.
- **Reduced motion** – Use `@media (prefers-reduced-motion: reduce)` to set `animation: none` or a single, slow pulse so the grid doesn’t strobe.
- **Hover to animate** – Already implemented; you could extend it (e.g. “click to pin” one loader animating for comparison).

---

## UX and product

- **Single-loader view** – One big loader plus a dropdown to pick pattern (and maybe color/size), like the original “Thinking” pill, for embedding or demos.
- **Copy pattern name** – Click a card to copy the pattern class name (e.g. `wave-lr`) or a small code snippet for reuse.
- **Container** – Optional wrapper (e.g. dark pill or light card) so the same loader can sit on different backgrounds.

---

## Quick wins

1. **Duration + easing** – One CSS variable for duration, one for `animation-timing-function`; optionally a small control in the UI.
2. **Size preset** – `size` prop on `LoaderCard` (e.g. `sm` / `md` / `lg`) that maps to Tailwind size classes.
3. **More colors** – Add 2–3 colors to the map and to `LoaderColor` / `PATTERNS`.
4. **`prefers-reduced-motion`** – Single rule in `loader-styles.css` to respect system preference.

---

## Technical notes

- **CSS variables** – Expose duration, opacity range, and maybe stagger scale as `--loader-duration`, `--loader-opacity-min`, etc., so one place controls all loaders or overrides per loader.
- **Size preset** – `sm` (e.g. `size-1.5`), `md` (`size-2`), `lg` (`size-3`) as a prop or global.
