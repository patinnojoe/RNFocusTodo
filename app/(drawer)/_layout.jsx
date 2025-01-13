import 'react-native-gesture-handler';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import DrawerContent from '../components/DrawerContent';
import { Appearance, StatusBar, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/assets/Theme/Colors';
// import AddTodoModal from '../components/AddTodoModal';

import { useDispatch } from 'react-redux';

import { openModal } from '../store/modalSlice';

export default function DrawerLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const dispatch = useDispatch();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={theme.backgroundColor}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: theme.headerBackgroundColor },
          headerTitleStyle: { color: theme.textColor, fontSize: 15 },
          sceneStyle: { backgroundColor: theme.backgroundColor },
          overlayColor: theme.overlayColor,

          headerRight: () => (
            // Custom Header Buttons
            <View style={{ flexDirection: 'row', gap: 10, marginRight: 20 }}>
              <TouchableOpacity onPress={() => console.log('Button 1 pressed')}>
                <Ionicons name="notifications-outline" size={24} color={theme.textColor} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(openModal())}>
                <Ionicons name="add-circle" size={24} color={theme.headerTintColor || theme.textColor} />
              </TouchableOpacity>
            </View>
          ),

          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Ionicons
                name="menu-outline"
                size={24}
                color={theme.headerTintColor || theme.textColor}
                style={{ marginLeft: 15 }}
              />
            </TouchableOpacity>
          ),
        })}
      >
        <Drawer.Screen
          name="index"
          options={({ navigation }) => ({
            drawerLabel: 'Focus Today',
            headerTitle: '',
            drawerIcon: ({ color, size, focus }) => <Ionicons name="timer-outline" size={size} color={color} />,
          })}
        />

        <Drawer.Screen
          name="analytics"
          options={{
            drawerLabel: 'Focus Analytics',
            headerTitle: '',
            drawerIcon: ({ color, size, focus }) => <Ionicons name="pie-chart-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
const createStyles = (theme, colorScheme) => ({
  headerStyle: {
    backgroundColor: theme.backgroundColor,
  },
});
