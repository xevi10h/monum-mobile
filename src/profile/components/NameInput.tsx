import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

interface NameInputProps {
  labelText: string;
  value: string;
  setValue: (string: string) => void;
}

export default function NameInput({
  labelText,
  value,
  setValue,
}: NameInputProps) {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
      }}>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#3F713B',
            fontFamily: 'Montserrat',
          }}>
          {labelText}
        </Text>
      </View>
      <View style={{alignItems: 'center', width: '100%'}}>
        <TextInput
          placeholder={'Password'}
          placeholderTextColor="#FFFFFF"
          value={value}
          style={{
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
            fontWeight: '600',
          }}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
}
