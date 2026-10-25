import { Platform } from 'react-native';

import palette from './palette';

export const Colors = palette;
export type Palette = (typeof palette)['light'];

/** Breathing pace in milliseconds. Change here to adjust the SOS rhythm. */
export const Breathing = {
  inhaleMs: 4000,
  exhaleMs: 6000,
  cyclesBeforeGrounding: 6,
} as const;

/** Space reserved at the bottom of tab screens so content clears the tab bar. */
export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
