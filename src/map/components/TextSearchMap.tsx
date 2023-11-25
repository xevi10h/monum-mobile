import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ViewStyle,
  Text,
  ScrollView,
} from 'react-native';
import routes_text_search from '../../assets/images/icons/routes_text_search.png';
import {t} from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import MapServices from '../services/MapServices';
import {Animated} from 'react-native';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native';

interface TextSearchMapProps {
  textSearch: string | undefined;
  setTextSearch: (string: string | undefined) => void;
  onSubmitEditing: () => void;
  isDropdownVisible: boolean;
  toggleDropdown: (visible: boolean) => void;
}

export default function TextSearchMap({
  textSearch,
  setTextSearch,
  onSubmitEditing,
  isDropdownVisible,
  toggleDropdown,
}: TextSearchMapProps) {
  useEffect(() => {
    toggleDropdown(isDropdownVisible); // Llama a toggleDropdown cuando isDropdownVisible cambie
  }, [isDropdownVisible]);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  console.log('suggestions', suggestions);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const suggestionsData =
        textSearch &&
        (await MapServices.getPlaceSearcherSuggestions(textSearch));
      setSuggestions(suggestionsData);
    };
    textSearch && fetchSuggestions();
  }, [textSearch]);

  return (
    <View
      style={{
        width: '90%',
        top: useSafeAreaInsets().top,
        marginTop: 10,
        position: 'absolute',
        alignSelf: 'center',
      }}>
      <View style={[styles.container]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.3}}
          colors={['#3C6AF62E', '#3F713B14']}
          style={styles.linearGradient}
        />
        <Image source={routes_text_search} style={styles.image} />
        <TextInput
          placeholder={t('routes.search') || 'Search'}
          placeholderTextColor="#3F713B"
          value={textSearch}
          onChangeText={setTextSearch}
          style={styles.textInput}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => toggleDropdown(true)} // Mostrar el desplegable cuando el TextInput está enfocado
          onBlur={() => toggleDropdown(false)} // Ocultar el desplegable cuando el TextInput pierde el foco
        />
      </View>
      <View
        style={{
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 10,
          zIndex: 1,
        }}>
        <ScrollView
          style={{
            backgroundColor: 'rgba(255,255,255,0.6)',
            maxHeight: isDropdownVisible ? 200 : 0,
            borderRadius: 12,
          }}>
          {suggestions.map((suggestion, i) => (
            <TouchableOpacity
              onPress={() => {
                setTextSearch(suggestion);
                onSubmitEditing();
                toggleDropdown(false);
              }}>
              <View
                key={i}
                style={{
                  borderWidth: 0.3,
                  borderColor: 'rgba(0,0,0,0.2)',
                  marginHorizontal: -10,
                  height: 40,
                }}>
                <Text
                  style={{
                    fontFamily: 'Montserrat',
                    fontSize: 14,
                    paddingHorizontal: 30,
                    paddingVertical: 10,
                  }}>
                  {suggestion}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(63, 113, 59, 0.1)',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 42,
    zIndex: 2,
    opacity: 1,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
  },
  image: {width: 22, height: 22, marginRight: 10},
  textInput: {
    color: '#3F713B',
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
});
