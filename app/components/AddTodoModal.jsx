import { Colors } from '@/assets/Theme/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Appearance,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/todoSlice';
import { closeModal } from '../store/modalSlice';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isLargeScreen = SCREEN_WIDTH > 1024;

const AddTodoModal = ({ isOpen, onClose }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  const todos = useSelector((state) => state.todos);
  const isModalOpen = useSelector((state) => state.modals.isOpen);

  const dispatch = useDispatch();
  const [todoInput, setTodoInput] = useState('');

  const handleTodoInput = (newText) => {
    setTodoInput(newText);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() === '') {
      return;
    }
    dispatch(
      addTodo({
        id: todos.todos.length + 1,
        text: todoInput,
        completed: false,
      }),
    );
    setTodoInput('');
    dispatch(closeModal());
  };

  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      onRequestClose={() => dispatch(closeModal())}
      transparent
      statusBarTranslucent
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.headerClose}>
              <Pressable onPress={() => dispatch(closeModal())}>
                <Ionicons name="close" size={24} color={'#DC3545'} />
              </Pressable>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.headerText}>Add a new task</Text>
              <TextInput
                style={styles.textInput}
                placeholder="What do you want to do today?"
                onChangeText={handleTodoInput}
                value={todoInput}
                placeholderTextColor="#999"
              />

              <Pressable style={styles.button} onPress={handleAddTodo}>
                <Text style={styles.buttonText}>Add ToDo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddTodoModal;

const createStyles = (theme, colorScheme) => ({
  centeredView: {
    flex: 1,
    justifyContent: isWeb && isLargeScreen ? 'center' : 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    width: isWeb && isLargeScreen ? Math.min(600, SCREEN_WIDTH - 40) : SCREEN_WIDTH,
    minHeight: isWeb && isLargeScreen ? Math.min(400, SCREEN_HEIGHT - 80) : SCREEN_HEIGHT * 0.4,
    maxHeight: isWeb && isLargeScreen ? SCREEN_HEIGHT - 80 : SCREEN_HEIGHT * 0.9,
    borderTopLeftRadius: isWeb && isLargeScreen ? 12 : 20,
    borderTopRightRadius: isWeb && isLargeScreen ? 12 : 20,
    borderBottomLeftRadius: isWeb && isLargeScreen ? 12 : 0,
    borderBottomRightRadius: isWeb && isLargeScreen ? 12 : 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 20,
  },
  headerClose: {
    alignItems: 'flex-end',
    padding: 16,
  },
  inputContainer: {
    padding: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: isWeb && isLargeScreen ? 24 : 20,
  },
  textInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    color: 'black',
    width: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.buttonBackgroundColor,
    padding: 16,
    width: '90%',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.buttonTextColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
