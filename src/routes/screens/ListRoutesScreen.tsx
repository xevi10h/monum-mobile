import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {RootState} from 'src/redux/store';
import {useSelector} from 'react-redux';
import {ListRoutesScreenProps} from '../navigator/RoutesNavigator';
import {useQuery} from '@apollo/client';
import {GET_ROUTES_OF_CITY} from '../../graphql/queries/routeQueries';
import {useEffect, useState} from 'react';
import IRouteOfCity from '../../shared/interfaces/IRouteOfCity';
import {StyleSheet} from 'react-native';
import DetailCityPill from '../components/DetailCityPill';
import TextSearch from '../components/TextSearch';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorComponent from '../../shared/components/ErrorComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {t} from 'i18next';
import ListRoutePill from '../components/ListRoutePill';

export default function ListRoutesScreen({
  route,
  navigation,
}: ListRoutesScreenProps) {
  const city = route.params.city;
  const user = useSelector((state: RootState) => state.user);
  const [routes, setRoutes] = useState<IRouteOfCity[]>([]);
  const [textSearch, setTextSearch] = useState<string | undefined>(undefined);

  const {loading, error, data, refetch} = useQuery(GET_ROUTES_OF_CITY, {
    variables: {
      cityId: city.id,
      language: user.language,
      textSearch: textSearch || '',
    },
  });

  useEffect(() => {
    console.log('data', data);
    setRoutes(data?.routes || []);
  }, [data, setRoutes]);
  return (
    <SafeAreaView style={styles.page}>
      <DetailCityPill
        cityName={city.translations[user.language] || ''}
        imageUrl={city.imageUrl}
        onPress={() => navigation.navigate('ListCities')}
      />
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
            {routes.map((route, i) => (
              <ListRoutePill
                route={route}
                key={i}
                onPress={() => navigation.navigate('RouteDetail', {route})}
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
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
});
