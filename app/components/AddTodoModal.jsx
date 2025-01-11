import { Colors } from '@/assets/Theme/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Appearance, Dimensions, Modal, Platform, Pressable, Text, TextInput, View } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const AddTodoModal = ({ isOpen, onClose }) => {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
      style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.headerClose}>
          <Pressable onPress={onClose}>
            <Ionicons name="close" size={24} color={'#DC3545'} />
          </Pressable>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.haederText}>Add a new task</Text>
          <TextInput style={styles.textInput} placeholder="What do you want to do today?" />

          <Pressable style={styles.button} onPress={() => console.log('Add ToDo')}>
            <Text style={styles.buttonText}>Add ToDo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddTodoModal;

const createStyles = (theme, colorScheme) => ({
  modalBackground: {
    backgroundColor: 'white',
    height: Platform.OS === 'web' && screenWidth > 1024 ? '70%' : '50%',
    width: Platform.OS === 'web' && screenWidth > 1024 ? '50%' : '100%',
    marginRight: 'auto',
    display: 'block',
    position: 'absolute',
    bottom: Platform.OS === 'web' && screenWidth > 1024 ? '50%' : 0,
    borderTopLeftRadius: Platform.OS === 'web' && screenWidth > 1024 ? 10 : 20,
    borderTopRightRadius: Platform.OS === 'web' && screenWidth > 1024 ? 10 : 20,
    borderBottomLeftRadius: Platform.OS === 'web' && screenWidth > 1024 ? 10 : 0,
    borderBottomRightRadius: Platform.OS === 'web' && screenWidth > 1024 ? 10 : 0,
    transform: [
      { translateY: Platform.OS === 'web' && screenWidth > 1024 ? '50%' : 0 },
      { translateX: Platform.OS === 'web' && screenWidth > 1024 ? '50%' : 0 },
    ],
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 10,
  },
  headerClose: {
    alignItems: 'flex-end',
    padding: 10,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    color: 'black',
    width: '100%',
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  haederText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' && screenWidth > 1024 ? 30 : 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.buttonBackgroundColor,
    padding: 15,
    width: '100%',
    borderRadius: 10,
    marginTop: Platform.OS === 'web' && screenWidth > 1024 ? 30 : 10,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.buttonTextColor,
    fontWeight: 'bold',
  },
});
