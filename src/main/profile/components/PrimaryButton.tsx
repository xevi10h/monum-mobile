import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';

interface PrimaryButtonProps {
  text: string;
  onPress: () => void;
}

export default function PrimaryButton({text, onPress}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      style={styles.button}
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
    flexDirection: 'row',
    backgroundColor: '#3F713B',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    marginVertical: '5%',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Montserrat-Regular',
  },
});
