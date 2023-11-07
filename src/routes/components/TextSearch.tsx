import {View, Image, TextInput, StyleSheet} from 'react-native';
import routes_text_search from '../../assets/images/icons/routes_text_search.png';
import {t} from 'i18next';
import LinearGradient from 'react-native-linear-gradient';

interface TextSearchProps {
  textSearch: string | undefined;
  setTextSearch: (string: string | undefined) => void;
}

export default function TextSearch({
  textSearch,
  setTextSearch,
}: TextSearchProps) {
  return (
    <View style={styles.container}>
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3F713B14',
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 42,
    width: '100%',
    zIndex: 999,
    marginTop: 10,
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
