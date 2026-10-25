import { NativeTabs } from 'expo-router/native-tabs';

import { usePalette } from '@/hooks/use-palette';

const tabs = [
  { name: 'index', label: 'Home', icon: require('@/assets/images/tabIcons/home.png') },
  { name: 'dump', label: 'Dump', icon: require('@/assets/images/tabIcons/dump.png') },
  { name: 'log', label: 'Log', icon: require('@/assets/images/tabIcons/log.png') },
  { name: 'plan', label: 'Plan', icon: require('@/assets/images/tabIcons/plan.png') },
] as const;

export default function TabLayout() {
  const c = usePalette();

  return (
    <NativeTabs
      backgroundColor={c.bg}
      indicatorColor={c.surface}
      iconColor={{ default: c.muted, selected: c.accent }}
      labelStyle={{ default: { color: c.muted }, selected: { color: c.ink } }}>
      {tabs.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <NativeTabs.Trigger.Label>{tab.label}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon src={tab.icon} renderingMode="template" />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
