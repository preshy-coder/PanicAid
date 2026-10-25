import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabInset } from '@/constants/theme';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg dark:bg-dark-bg">
      <View className="flex-1 px-7" style={{ paddingBottom: BottomTabInset }}>
        <View className="pt-8">
          <Text className="text-3xl font-semibold text-ink dark:text-dark-ink">{greeting()}.</Text>
          <Text className="mt-2 text-lg leading-7 text-muted dark:text-dark-muted">
            Whatever you’re feeling right now, it will pass. Take your time.
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          {/* Soft halo around the button echoes the breathing circle inside SOS */}
          <View className="items-center justify-center rounded-full bg-accentSoft/40 p-6 dark:bg-dark-accentSoft/40">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="I need to calm down. Opens guided breathing."
              onPress={() => router.push('/sos')}
              className="h-64 w-64 items-center justify-center rounded-full bg-accent px-8 active:opacity-80 dark:bg-dark-accent">
              <Text className="text-center text-2xl font-semibold leading-8 text-onAccent dark:text-dark-onAccent">
                I need to calm down
              </Text>
            </Pressable>
          </View>
          <Text className="mt-6 text-base text-muted dark:text-dark-muted">
            Opens guided breathing, then grounding
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
