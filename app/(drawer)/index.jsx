import { Link } from 'expo-router';
import { Appearance, Button, Dimensions, Platform, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddTodoModal from '../components/AddTodoModal';
import { Colors } from '@/assets/Theme/Colors';
import CheckBox from '../components/Checkbox';
import { useState } from 'react';
import { toggleTodo } from '../store/todoSlice';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = SCREEN_WIDTH > 1024;

const createStyles = (theme, colorScheme) => ({
  todoContainer: {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.textColor,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, // Added for better appearance
    margin: 10,
    elevation: 3,
    maxWidth: isWeb && isLargeScreen ? '60%' : '100%',
  },
  text: {
    color: theme.textColor,
    fontSize: isWeb && isLargeScreen ? 20 : 15,
  },
  textHeader: {
    fontWeight: 'bold',
    margin: 10,
    color: theme.textColor,
    fontSize: isWeb && isLargeScreen ? 30 : 15,
  },
  image: {
    width: isWeb && isLargeScreen ? 500 : 300,
    height: isWeb && isLargeScreen ? 500 : 300,
    marginHorizontal: 'auto',
  },
  blankContainer: {},
});

export const TodoCard = ({ todo }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const dispatch = useDispatch();

  const handleTodoCheck = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <View style={styles.todoContainer}>
      <CheckBox
        isChecked={todo.completed}
        onPress={() => handleTodoCheck(todo.id)}
        iconColor={todo.completed ? 'green' : theme.textColor}
      />
      <Text
        style={[
          styles.text,
          todo.completed ? { textDecorationLine: 'line-through', color: '#cecece', fontStyle: 'italic' } : '',
        ]}
      >
        {todo.text}
      </Text>
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
        <Text style={styles.textHeader}>Today's Focus</Text>
        {/* <Image source={require('../../assets/images/avatar.png')} style={styles.image} /> */}
        {allTodos.length > 0 ? (
          allTodos.map((todo, index) => <TodoCard key={todo.id} todo={todo} />)
        ) : (
          <View>
            <Image source={require('../../assets/images/blank.png')} style={styles.image} />
            <Text style={[styles.text, { textAlign: 'center' }]}>Click the add Button to add Todos </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default Home;
