import { Colors } from '@/assets/Theme/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { Link } from 'expo-router';
import { View, Image, Appearance, Text, ScrollView } from 'react-native';

const DrawerContent = ({ navigation }) => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const iconActiveColor = theme.activeIconColor;
  console.log(iconActiveColor);
  return (
    <View style={styles.container}>
      {/* user avatar wrapper */}
      <View style={styles.avatarWrapper}>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/images/avatar.png')} style={styles.image} />
        </View>
        <Text style={[styles.text, styles.userName]}>Innocent Josiah Patrick</Text>
      </View>

      {/* drawer items */}
      <ScrollView style={styles.drawerItems}>
        <View
          style={[
            styles.drawerItemContainer,
            routeName === 'index' ? { backgroundColor: theme.hoverBackgroundColor } : null,
          ]}
        >
          <Link href="/" style={{ width: '100%', textDecorationLine: 'none' }}>
            <View style={styles.link}>
              <Ionicons
                name={routeName === 'index' ? 'home' : 'home-outline'}
                size={routeName === 'index' ? 24 : 20}
                color={routeName === 'index' ? theme.activeIconColor : theme.inactiveIconColor}
              />
              <Text style={styles.text}>Focus Today</Text>
            </View>
          </Link>
        </View>

        <View
          style={[
            styles.drawerItemContainer,
            routeName === 'analytics' ? { backgroundColor: theme.hoverBackgroundColor } : null,
          ]}
        >
          <Link href="/analytics" style={{ width: '100%', textDecorationLine: 'none' }}>
            <View style={styles.link}>
              <Ionicons
                name={routeName === 'analytics' ? 'pie-chart' : 'pie-chart-outline'}
                size={routeName === 'analtytics' ? 24 : 20}
                color={routeName === 'analytics' ? theme.activeIconColor : theme.inactiveIconColor}
              />
              <Text style={styles.text}>Analytics</Text>
            </View>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default DrawerContent;

const createStyles = (theme, colorScheme) => ({
  imageContainer: {
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'red',
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: theme.borderColor,
    alignItems: 'center',
    marginHorizontal: 'auto',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  text: {
    color: theme.textColor,
  },
  avatarWrapper: {
    gap: 10,
    borderBottomWidth: 1,
    borderColor: theme.borderColor,
    width: '100%',
    padding: 20,
  },
  userName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  drawerItems: {
    marginTop: 20,
  },
  drawerItemContainer: {
    marginBottom: 20,
  },
  link: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
});
