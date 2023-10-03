import {View, Image, TextInput, StyleSheet} from 'react-native';
import routes_text_search from '../../assets/images/icons/routes_text_search.png';
import {t} from 'i18next';

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
    height: 42,
    width: '100%',
    backgroundColor: '#3F713B14',
    borderRadius: 12,
    shadowColor: '#3C6AF6',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 15,
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
