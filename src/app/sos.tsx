import { useKeepAwake } from 'expo-keep-awake';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BreathingCircle } from '@/components/breathing-circle';
import { CalmButton } from '@/components/calm-button';
import { GroundingStep, SENSES } from '@/components/grounding-step';
import { Breathing } from '@/constants/theme';

type Stage = 'breathe' | 'ground' | 'done';

export default function SosScreen() {
  useKeepAwake(); // screen stays on for the whole SOS flow

  const [stage, setStage] = useState<Stage>('breathe');
  const [cycles, setCycles] = useState(0);
  const [senseIndex, setSenseIndex] = useState(0);

  const exit = () => router.back();
  const onCycle = useCallback(() => setCycles((n) => n + 1), []);

  const nextSense = useCallback(() => {
    setSenseIndex((i) => {
      if (i + 1 >= SENSES.length) {
        setStage('done');
        return i;
      }
      return i + 1;
    });
  }, []);

  const goBack = () => {
    if (senseIndex === 0) setStage('breathe');
    else setSenseIndex((i) => i - 1);
  };

  const breatheAgain = () => {
    setCycles(0);
    setSenseIndex(0);
    setStage('breathe');
  };

  const readyForGrounding = cycles >= Breathing.cyclesBeforeGrounding;

  return (
    <SafeAreaView className="flex-1 bg-bg dark:bg-dark-bg">
      {/* top bar */}
      <View className="h-14 flex-row items-center justify-between px-5">
        {stage === 'ground' ? (
          <Pressable onPress={goBack} hitSlop={12} accessibilityRole="button">
            <Text className="text-lg text-muted dark:text-dark-muted">Back</Text>
          </Pressable>
        ) : (
          <View />
        )}
        {stage !== 'done' && (
          <Pressable onPress={exit} hitSlop={12} accessibilityRole="button">
            <Text className="text-lg text-muted dark:text-dark-muted">I’m okay now</Text>
          </Pressable>
        )}
      </View>

      {stage === 'breathe' && (
        <View className="flex-1 items-center justify-between px-6 pb-10">
          <Text className="mt-4 text-center text-lg leading-7 text-muted dark:text-dark-muted">
            Follow the circle. Let each breath out be slower than the breath in.
          </Text>
          <BreathingCircle onCycle={onCycle} />
          <View className="w-full items-center gap-3" style={{ minHeight: 140 }}>
            <Text className="text-base text-muted dark:text-dark-muted">
              {cycles === 1 ? '1 breath' : `${cycles} breaths`}
            </Text>
            {readyForGrounding && (
              <View className="w-full gap-3">
                <CalmButton label="Next: ground myself" onPress={() => setStage('ground')} />
                <CalmButton
                  label="Keep breathing"
                  variant="quiet"
                  onPress={() => setCycles(0)}
                />
              </View>
            )}
          </View>
        </View>
      )}

      {stage === 'ground' && (
        <View className="flex-1 justify-center px-6 pb-16">
          {/* key resets the dots when the step changes */}
          <GroundingStep key={senseIndex} step={SENSES[senseIndex]} onComplete={nextSense} />
        </View>
      )}

      {stage === 'done' && (
        <View className="flex-1 justify-center px-8 pb-10">
          <Text className="text-4xl font-semibold text-ink dark:text-dark-ink">You got through it.</Text>
          <Text className="mt-4 text-xl leading-8 text-muted dark:text-dark-muted">
            Panic always passes, and you just rode this one out. Go gently for the next little
            while. A glass of water and a few slow breaths can help.
          </Text>

          {/* TODO(Task 3): add a "Log this episode" button here that opens the trigger log. */}

          <View className="mt-12 gap-3">
            <CalmButton label="Done" onPress={exit} />
            <CalmButton label="Breathe again" variant="quiet" onPress={breatheAgain} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
