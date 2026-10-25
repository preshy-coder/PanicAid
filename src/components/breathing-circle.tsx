import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Breathing } from '@/constants/theme';
import { usePalette } from '@/hooks/use-palette';

type Phase = 'in' | 'out';

const SMALL = 0.55;
const LARGE = 1;
const SIZE = 260;
const IN_S = Breathing.inhaleMs / 1000;
const OUT_S = Breathing.exhaleMs / 1000;

type Props = {
  /** Called each time a full in+out breath finishes. */
  onCycle: () => void;
};

/**
 * The circle grows while breathing in and shrinks while breathing out.
 * A single one-second clock drives the text, countdown, haptics and animation so they stay in step.
 */
export function BreathingCircle({ onCycle }: Props) {
  const c = usePalette();
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(SMALL);
  const [breath, setBreath] = useState({ phase: 'in' as Phase, left: IN_S, count: 0 });
  const { phase, left: secondsLeft, count } = breath;

  // One clock for everything: count down each second, then flip the phase.
  useEffect(() => {
    const tick = setInterval(() => {
      setBreath((b) => {
        if (b.left > 1) return { ...b, left: b.left - 1 };
        return b.phase === 'in'
          ? { phase: 'out', left: OUT_S, count: b.count }
          : { phase: 'in', left: IN_S, count: b.count + 1 };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // At the start of every phase: gentle vibration + move the circle.
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    const target = phase === 'in' ? LARGE : SMALL;
    const duration = phase === 'in' ? Breathing.inhaleMs : Breathing.exhaleMs;
    scale.value = reduceMotion
      ? target
      : withTiming(target, { duration, easing: Easing.inOut(Easing.sin) });
  }, [phase, count, reduceMotion, scale]);

  // Tell the parent each time a full breath (in + out) is finished.
  useEffect(() => {
    if (count > 0) onCycle();
  }, [count, onCycle]);

  const circleStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View
      style={{ width: SIZE, height: SIZE }}
      className="items-center justify-center"
      accessibilityLiveRegion="polite"
      accessibilityLabel={phase === 'in' ? 'Breathe in' : 'Breathe out'}>
      {/* faint outline shows how big the circle will get */}
      <View
        style={[StyleSheet.absoluteFill, { borderColor: c.accentSoft, borderRadius: SIZE / 2 }]}
        className="border-2"
      />
      <View style={StyleSheet.absoluteFill} className="items-center justify-center">
        <Animated.View
          style={[
            { width: SIZE, height: SIZE, backgroundColor: c.accentSoft, borderRadius: SIZE / 2 },
            circleStyle,
          ]}
        />
      </View>
      <Text className="text-2xl font-semibold text-ink dark:text-dark-ink">
        {phase === 'in' ? 'Breathe in…' : 'Breathe out…'}
      </Text>
      <Text className="mt-1 text-xl text-muted dark:text-dark-muted">{secondsLeft}</Text>
    </View>
  );
}
