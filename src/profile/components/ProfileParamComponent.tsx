import {Dispatch, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles/ProfileStyles';
import {TextInput} from 'react-native-gesture-handler';

interface ProfileParamComponentProps {
  labelText: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function ProfileParamComponent({
  labelText,
  value,
  setValue,
}: ProfileParamComponentProps) {
  return (
    <View>
      <View style={styles.profileParamLabelContainer}>
        <Text style={styles.profileParamLabelText}>{labelText}</Text>
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
          }}
          onChangeText={setValue}
        />
      </View>
    </View>
  );
}
