import {GestureResponderEvent, Text, TouchableOpacity} from 'react-native';

import {styles} from '../styles/MapStyles';

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

export default function FilterPill({label, active, onPress}: FilterPillProps) {
  return (
    <TouchableOpacity
      style={[styles.filterPill, {backgroundColor: active ? 'grey' : 'white'}]}
      onPress={onPress}>
      <Text
        style={[styles.filterPillText, {color: active ? 'white' : 'black'}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
