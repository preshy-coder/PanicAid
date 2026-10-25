import { Pressable, Text } from 'react-native';

type Props = { label: string; onPress: () => void; variant?: 'primary' | 'quiet' };

export function CalmButton({ label, onPress, variant = 'primary' }: Props) {
  const primary = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={`items-center rounded-full px-8 py-4 active:opacity-70 ${
        primary ? 'bg-accent dark:bg-dark-accent' : 'bg-surface dark:bg-dark-surface'
      }`}>
      <Text
        className={`text-lg font-semibold ${
          primary ? 'text-onAccent dark:text-dark-onAccent' : 'text-ink dark:text-dark-ink'
        }`}>
        {label}
      </Text>
    </Pressable>
  );
}
