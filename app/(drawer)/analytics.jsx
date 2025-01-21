import { Colors } from '@/assets/Theme/Colors';
import { Appearance, Dimensions, Platform, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectCompletedTodos, selectTotalTodos, selectUncompletedTodos } from '../store/todoSlice';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = SCREEN_WIDTH > 1024;

const createStyles = (theme, colorScheme) => ({
  analyticsContainer: {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.textColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10, // Added for better appearance
    margin: 10,
    elevation: 3,
    flex: isWeb && isLargeScreen ? 1 : '',
    // maxWidth: isWeb && isLargeScreen ? '60%' : '100%',
  },
  text: {
    color: theme.textColor,
    fontSize: isWeb && isLargeScreen ? 20 : 15,
  },

  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
  },
  textHeader: {
    fontWeight: 'bold',
    margin: 10,
    color: theme.textColor,
    fontSize: isWeb && isLargeScreen ? 30 : 15,
  },
  value: {
    fontSize: isWeb && isLargeScreen ? 40 : 20,
    fontWeight: 'bold',
    color: theme.textColor,
  },

  label: {
    fontSize: isWeb && isLargeScreen ? 30 : 17,
    fontWeight: 'bold',
    color: theme.textColor,
  },
  description: {
    fontSize: isWeb && isLargeScreen ? 14 : 10,
    color: theme.textColor,
  },
  analyticsParent: {
    flexDirection: isWeb && isLargeScreen ? 'row' : 'column',
    gap: isWeb && isLargeScreen ? 10 : 5,
  },
});

export const AnalyticsCard = ({ title, value, description }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  return (
    <View style={styles.analyticsContainer}>
      <View style={styles.analyticsHeader}>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const Analytics = () => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const totalTodos = useSelector(selectTotalTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const uncompletedTodos = useSelector(selectUncompletedTodos);

  return (
    <View>
      <Text style={styles.textHeader}>User Analytics</Text>
      <View style={styles.analyticsParent}>
        <AnalyticsCard title="Total ToDos" value={totalTodos} description="Total number of todos created by you" />
        <AnalyticsCard
          title="Total Completed"
          value={completedTodos}
          description="Total number of todos completed by you"
        />
        <AnalyticsCard
          title="Total Uncompleted"
          value={uncompletedTodos}
          description="Total number of todos uncompleted by you"
        />
      </View>
    </View>
  );
};

export default Analytics;
