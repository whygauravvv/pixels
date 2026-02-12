# Pixels - Beautiful loaders for the web

Pixels is a **collection of beautiful pixel loaders** for the web..  
Use the gallery to browse premade patterns or you can make your own with the studio.

![Pixels – Beautiful loaders for the web](./public/og.jpeg)

## The Idea

I was inspired by [this tweet](https://x.com/k_grajeda/status/2018769520547012702) from Kevin Grajeda. The loaders are pure vanilla css with just a few lines of code. I didn't want to stop myself to just a library of loaders, so i tweaked around and built a ui to create your own pattern and copy the code to use it in your project.

## Tech stack

- **React + TypeScript**: UI and state management.
- **Vite**: fast dev server and build pipeline.
- **React Router**: client-side routing for the gallery and studio.
- **Tailwind CSS + custom CSS**: layout/design via utilities, animation via keyframes and per-cell delays.
- **shadcn/ui**: lightweight components for cards/popovers/tooltips (see `src/components/ui/`).

## Where the animations live

- **Keyframes + pattern classes**: `src/loader-styles.css`
  - Contains the `@keyframes loader-pulse` animation and the preset pattern classes (e.g. waves, diagonals, ripple).
- **Studio preview grid**: `src/pages/studio/studio.tsx`
  - Renders the 3×3 grid and applies per-cell `animation-delay` + cycle duration.
- **Studio timing logic**: `src/context/studio-settings-context.tsx`
  - Holds the current `steps` array, `duration`, and helpers like `stepToDelayMs`.
- **Global animation toggles**: `src/context/settings-context.tsx`
  - Controls bloom and play/pause behavior via classes on the root element.

## Contributing

Feel free to contribute if you think it can be improved in any way.

- **Install**: `npm install`
- **Run locally**: `npm run dev`
- **What to contribute**
  - New loader patterns in `src/loader-styles.css`
  - Studio UX improvements (grid interactions, presets, export)
  - Bug fixes and performance/accessibility tweaks
- **Guidelines**
  - Keep patterns readable and consistent (small, composable CSS rules).
  - Prefer minimal dependencies and avoid clever hacks—this codebase should stay easy to extend.
  - Include a short description and screenshots/GIFs in your PR when adding new patterns.

Feel free to take this and give it your own touch, this is just a part of my experiments with design and code.
