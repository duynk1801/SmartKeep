import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: true,
        animation: 'slide_from_bottom',
      }}
    />
  );
}
