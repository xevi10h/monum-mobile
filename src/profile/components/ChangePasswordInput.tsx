import {t} from 'i18next';
import {StyleSheet, Text, View, TextInput} from 'react-native';

interface ChangePasswordInputProps {
  value: string;
  setValue: (string: string) => void;
  defaultText?: string;
}

export default function ChangePasswordInput({
  value,
  setValue,
  defaultText,
}: ChangePasswordInputProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          style={styles.inputText}
          onChangeText={setValue}
          placeholder={defaultText || ''}
          placeholderTextColor="#3F713B"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {alignItems: 'center', width: '100%'},
  inputText: {
    paddingHorizontal: 15,
    borderColor: '#3F713B3D',
    color: '#3F713B',
    borderWidth: 2,
    borderRadius: 12,
    height: 48,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
