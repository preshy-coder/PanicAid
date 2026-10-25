import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = { title: string; description: string };

export function ComingSoon({ title, description }: Props) {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-bg dark:bg-dark-bg">
      <View className="flex-1 justify-center px-8">
        <Text className="text-3xl font-semibold text-ink dark:text-dark-ink">{title}</Text>
        <Text className="mt-3 text-lg leading-7 text-muted dark:text-dark-muted">{description}</Text>
        <Text className="mt-6 text-base text-accent dark:text-dark-accent">Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
