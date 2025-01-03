import 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Focus Today',
            headerTitle: 'Focus Today',
            drawerIcon: ({ color, size, focus }) => <Ionicons name="timer-outline" size={size} color={color} />,
          }}
        />

        <Drawer.Screen
          name="analytics"
          options={{
            drawerLabel: 'Focus Analytics',
            headerTitle: 'Focus Analytics',
            drawerIcon: ({ color, size, focus }) => <Ionicons name="pie-chart-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
