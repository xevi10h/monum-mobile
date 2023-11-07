import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/client';
import TextSearch from '../components/TextSearch';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GET_CITIES} from '../../graphql/queries/routeQueries';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorComponent from '../../shared/components/ErrorComponent';
import ICity from '../../shared/interfaces/ICity';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoutesStackParamList} from '../navigator/RoutesNavigator';
import ListCityPill from '../components/ListCityPill';

type ListCitiesScreenNavigationProp = StackNavigationProp<
  RoutesStackParamList,
  'ListCities'
>;

type Props = {
  navigation: ListCitiesScreenNavigationProp;
};

export default function ListCitiesScreen({navigation}: Props) {
  const user = useSelector((state: RootState) => state.user);
  const [textSearch, setTextSearch] = useState<string | undefined>(undefined);
  const [cities, setCities] = useState<ICity[]>([]);
  const {loading, error, data, refetch} = useQuery(GET_CITIES, {
    variables: {textSearch: textSearch || ''},
  });

  useEffect(() => {
    refetch();
  }, [textSearch, refetch]);

  useEffect(() => {
    setCities(data?.cities || []);
  }, [data, setCities]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.contentContainer}>
        <TextSearch setTextSearch={setTextSearch} textSearch={textSearch} />
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorComponent
            errorMessage={t('routes.errorGettingAvailableCities')}
            onRetry={() => refetch()}
          />
        ) : (
          <ScrollView
            scrollEventThrottle={16}
            style={{
              width: '100%',
              marginBottom: useSafeAreaInsets().bottom + 30,
              marginTop: 15,
            }}
            showsVerticalScrollIndicator={false}>
            {cities.map((city, i) => (
              <ListCityPill
                key={i}
                onPress={() => navigation.navigate('ListRoutes', {city})}
                cityName={city.translations[user.language] || ''}
                imageUrl={city.imageUrl}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 15,
    alignItems: 'center',
  },
});
