import {t} from 'i18next';
import {useState} from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (string: string) => void;
}

export default function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(language || 'en_US');

  // TO DO: Get languages from API
  const [languages, setLanguages] = useState([
    {label: t('languages.en_US'), value: 'en_US'},
    {label: t('languages.es_ES'), value: 'es_ES'},
    {label: t('languages.fr_FR'), value: 'fr_FR'},
  ]);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
        zIndex: 10,
        position: 'relative',
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
          {t('profile.language')}
        </Text>
        <DropDownPicker
          open={open}
          value={value}
          items={languages}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setLanguages}
          textStyle={{
            fontSize: 16,
            color: '#3F713B',
            fontFamily: 'Montserrat',
            fontWeight: '400',
          }}
          disableBorderRadius={true}
          placeholder={t(`languages.${value}`) || ''}
          labelStyle={{
            fontSize: 16,
            color: '#3F713B',
            fontFamily: 'Montserrat',
            fontWeight: '600',
          }}
          selectedItemLabelStyle={{
            fontWeight: '600',
          }}
          listItemLabelStyle={{
            fontWeight: '400',
          }}
          style={{
            paddingHorizontal: 15,
            borderColor: '#3F713B3D',
            borderWidth: 2,
            borderRadius: 12,
            height: 48,
            marginVertical: 10,
          }}
          dropDownContainerStyle={{
            paddingHorizontal: 5,
            borderColor: '#3F713B3D',
            marginVertical: 10,
          }}
        />
      </View>
      <View style={{alignItems: 'center', width: '100%'}}></View>
    </View>
  );
}
