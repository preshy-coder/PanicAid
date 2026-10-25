import { useColorScheme } from 'react-native';

import { Colors, type Palette } from '@/constants/theme';

/** Current light/dark palette, for places that need raw colors (animations, tab bar). */
export function usePalette(): Palette {
  return useColorScheme() === 'dark' ? Colors.dark : Colors.light;
}
