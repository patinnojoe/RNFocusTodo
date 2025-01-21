import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckBox = ({ title, iconColor, isChecked = false, onPress, hasTitle = false }) => {
  const iconName = isChecked === false ? 'radio-button-off-outline' : 'radio-button-on-outline';
  const radioIconColor = iconColor ? iconColor : '#000';

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Ionicons name={iconName} size={24} color={radioIconColor} />
      </Pressable>
      {hasTitle && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
    fontWeight: '600',
  },
});
