import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export type Sense = { count: number; sense: string; prompt: string };

export const SENSES: Sense[] = [
  { count: 5, sense: 'see', prompt: 'Look around. Name 5 things you can see.' },
  { count: 4, sense: 'touch', prompt: 'Name 4 things you can touch or feel right now.' },
  { count: 3, sense: 'hear', prompt: 'Listen. Name 3 things you can hear.' },
  { count: 2, sense: 'smell', prompt: 'Name 2 things you can smell.' },
  { count: 1, sense: 'taste', prompt: 'Name 1 thing you can taste.' },
];

type Props = { step: Sense; onComplete: () => void };

/** One sense of the 5-4-3-2-1 exercise. Tap a dot for each thing noticed. */
export function GroundingStep({ step, onComplete }: Props) {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (filled < step.count) return;
    // short pause so the last dot is seen filling before moving on
    const t = setTimeout(onComplete, 700);
    return () => clearTimeout(t);
  }, [filled, step.count, onComplete]);

  const tap = () => {
    if (filled >= step.count) return;
    Haptics.selectionAsync().catch(() => {});
    setFilled((f) => f + 1);
  };

  return (
    <View className="items-center">
      <Text className="text-7xl font-semibold text-accent dark:text-dark-accent">{step.count}</Text>
      <Text className="mt-1 text-xl text-muted dark:text-dark-muted">things you can {step.sense}</Text>
      <Text className="mt-8 px-4 text-center text-2xl leading-9 text-ink dark:text-dark-ink">
        {step.prompt}
      </Text>

      <View className="mt-10 flex-row flex-wrap justify-center gap-3">
        {Array.from({ length: step.count }, (_, i) => (
          <Pressable
            key={i}
            onPress={tap}
            accessibilityRole="button"
            accessibilityLabel={`Noticed ${Math.min(filled + 1, step.count)} of ${step.count}`}
            className={`h-12 w-12 rounded-full border-2 border-accent dark:border-dark-accent ${
              i < filled ? 'bg-accent dark:bg-dark-accent' : ''
            }`}
          />
        ))}
      </View>
      <Text className="mt-6 text-base text-muted dark:text-dark-muted">
        Tap a circle for each one you notice
      </Text>
    </View>
  );
}
