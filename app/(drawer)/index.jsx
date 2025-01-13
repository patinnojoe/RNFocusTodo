import { Link } from 'expo-router';
import { Appearance, Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AddTodoModal from '../components/AddTodoModal';
import { Colors } from '@/assets/Theme/Colors';

const createStyles = (theme, colorScheme) => ({
  todoContainer: {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.textColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10, // Added for better appearance
    margin: 5, // Added for spacing between cards
  },
});

export const TodoCard = ({ todo }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.todoContainer}>
      <Text>{todo.text}</Text>
    </View>
  );
};

const Home = () => {
  const todos = useSelector((state) => state.todos);
  const allTodos = todos.todos;
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  return (
    <>
      <AddTodoModal />
      <View>
        {allTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </View>
    </>
  );
};

export default Home;
