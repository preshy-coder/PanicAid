# Task 01: Project setup + SOS flow

## What was built
- New Expo app **PanicAid** (Expo Router, TypeScript, NativeWind).
- Home tab with a large SOS button ("I need to calm down") inside a soft halo that echoes the breathing circle.
- SOS opens as a full-screen modal with three stages:
  1. **Breathe**: circle grows over 4s and shrinks over 6s, with "Breathe in… / Breathe out…" and a seconds countdown. Light haptic tap at every switch. Screen kept awake. Breath counter; after 6 breaths, "Next: ground myself" and "Keep breathing" appear. "I'm okay now" exits at any time. Respects the phone's reduce-motion setting (circle jumps instead of animating).
  2. **Ground**: 5-4-3-2-1, one sense at a time, tap a dot per thing noticed; moves on automatically when all dots are filled. "Back" goes to the previous sense (or back to breathing from the first one).
  3. **Done**: "You got through it." with "Done" and "Breathe again". A `TODO(Task 3)` marks where "Log this episode" goes.
- Dump, Log and Plan tabs with "Coming soon" screens describing what each will do.
- Custom tab icons, app icon, adaptive Android icon and splash in the app's teal.
- Light and dark mode. All colors live in `src/constants/palette.js`; Tailwind reads the same file.

## Packages (key ones)
| Package | Version |
|---|---|
| expo | ~58.0.19 |
| expo-router | ~58.0.26 |
| react-native | 0.88.0 |
| react | 19.3.0 |
| react-native-reanimated | 4.7.1 |
| expo-haptics | ~58.0.7 |
| expo-keep-awake | ~58.0.3 |
| nativewind | ^4.2.7 |
| tailwindcss (dev) | ^3.4.17 |
| typescript (dev) | ~6.0.3 |

## How to run
See README: `npm install`, then `npx expo start`, scan with Expo Go.

## Verification done
- `npx tsc --noEmit`: clean.
- `npx expo lint`: clean.
- `npx expo export --platform android`: bundles successfully (Metro + NativeWind + Babel config OK).
- Web build walked through in a headless browser: home → SOS → 6 breaths → grounding (all 15 dots) → finish screen, in light and dark mode.
- **Not yet tested on a real phone.** Haptics and keep-awake only work on a device.

## Needs your input
- Does 4s in / 6s out feel right? Change in `src/constants/theme.ts`.
- Android package id is set to `com.bond50.panicaid` (needed later for the APK). Change in `app.json` if you prefer another.

## Notes
- Built from the SDK 58 default template; demo screens and assets removed.
- Breathing timing uses one 1-second clock that drives the text, countdown, haptics and animation together, so they can't drift apart.

## Suggestions for Task 2 (Overwhelm dump)
- Store items locally with `expo-sqlite` (also reusable for the Task 3 log).
- Flow: type freely (one thought per line) → sort each into Now / Later / Not mine to carry → simple list view with swipe to done.
