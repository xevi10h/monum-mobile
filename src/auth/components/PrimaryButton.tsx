import React from 'react';
import {Text, TouchableOpacity, GestureResponderEvent} from 'react-native';

import {styles} from '../styles/LoginStyles';

interface PrimaryButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export default function PrimaryButton({text, onPress}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      style={styles.primaryButton}
      onPress={onPress}>
      <Text style={styles.primaryButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}
