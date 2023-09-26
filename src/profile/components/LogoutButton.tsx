import React from 'react';
import {
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';

interface LogoutButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function LogoutButton({text, onPress}: LogoutButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      style={[styles.button]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    height: 48,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF172',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10, // Solo para Android
  },
  buttonText: {
    fontSize: 18,
    color: '#032000',
    fontFamily: 'Montserrat',
  },
});
