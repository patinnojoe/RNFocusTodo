import { Link } from 'expo-router';
import { Appearance, Button, Dimensions, Platform, Text, View, Image, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AddTodoModal from '../components/AddTodoModal';
import { Colors } from '@/assets/Theme/Colors';
import CheckBox from '../components/Checkbox';
import { useState } from 'react';
import { toggleTodo, setTodos, removeTodo } from '../store/todoSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Animated, { LinearTransition } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    maxWidth: isWeb && isLargeScreen ? '100%' : '100%',
    justifyContent: 'space-between',
  },
  text: {
    color: theme.textColor,
    fontSize: isWeb && isLargeScreen ? 20 : 15,
  },
  textHeader: {
    fontWeight: 'bold',
    marginTop: 50,
    color: theme.textColor,
    textAlign: 'center',
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
    // console.log(todo);
  };
  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={styles.todoContainer}>
      <View style={{ flexDirection: 'row' }}>
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
      {/* <Ionicons name="trash" color="red" size={14} /> */}
      <Pressable onPress={() => handleDelete(todo.id)}>
        <Text style={[styles.text, { color: 'red' }]}>Delete</Text>
      </Pressable>
    </View>
  );
};

const Home = () => {
  let todos = useSelector((state) => state.todos);
  console.log(todos.todos, 'selected todo aab');
  const dispatch = useDispatch();

  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log('change occured');
        const jsonValue = await AsyncStorage.getItem('RNTodo');
        const storedTodos = jsonValue !== null ? JSON.parse(jsonValue) : [];
        dispatch(setTodos(storedTodos));
        // setAllTodos(storedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    // Add new todo to AsyncStorage

    const updatedTodos = [...todos.todos];

    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('RNTodo', JSON.stringify(updatedTodos));
      } catch (error) {
        console.error('Error saving todos:', error);
      }
    };

    saveTodos();
  }, [todos]);

  return (
    <>
      <AddTodoModal />
      <View
        style={{
          maxWidth: 1024,
          width: '100%',
          marginHorizontal: 'auto',
        }}
      >
        <Text style={styles.textHeader}>Today's Focus</Text>

        <Animated.FlatList
          itemLayoutAnimation={LinearTransition}
          keyboardDismissMode="on-drag"
          data={todos.todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoCard todo={item} />}
          ListEmptyComponent={
            <View>
              <Image source={require('../../assets/images/blank.png')} style={styles.image} />
              <Text style={[styles.text, { textAlign: 'center' }]}>Click the add Button to add Todos </Text>
            </View>
          }
        />
      </View>
    </>
  );
};

export default Home;
