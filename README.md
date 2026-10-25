# PanicAid

A personal app for getting through panic and overwhelm. Everything stays on your phone: no account, no server, no tracking, and it works offline.

## What's in it so far (Task 1)

- **Home** with one big "I need to calm down" button.
- **SOS flow**: guided breathing (in 4s, out 6s) with gentle vibrations, then 5-4-3-2-1 grounding, then a finish screen.
- **Dump, Log, Plan** tabs are placeholders for Tasks 2–4.

## Run it on your phone

1. Install **Node.js LTS** on your computer (https://nodejs.org).
2. Install **Expo Go** on your Android phone from the Play Store.
3. In a terminal inside this folder:
   ```
   npm install
   npx expo start
   ```
4. Scan the QR code with Expo Go. Phone and computer must be on the same Wi-Fi.
   If it won't connect, run `npx expo start --tunnel` instead.

## Where to change things

- Colors (light and dark): `src/constants/palette.js`
- Breathing pace and number of breaths before grounding: `src/constants/theme.ts`
- Grounding prompts: `src/components/grounding-step.tsx`

## Project layout

```
src/
  app/
    _layout.tsx          root stack (tabs + SOS modal)
    sos.tsx              SOS flow: breathe -> ground -> done
    (tabs)/
      _layout.tsx        bottom tabs
      index.tsx          Home
      dump.tsx log.tsx plan.tsx   placeholders
  components/
    breathing-circle.tsx
    grounding-step.tsx
    calm-button.tsx
    coming-soon.tsx
  constants/             palette.js, theme.ts
  hooks/use-palette.ts
```

## Checks

```
npx tsc --noEmit   # typecheck
npx expo lint      # lint
```
