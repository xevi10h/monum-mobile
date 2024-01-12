import {ScrollView, Text, View} from 'react-native';
import {RootState} from 'src/redux/store';
import {useSelector} from 'react-redux';
import {ListRoutesScreenProps} from '../navigator/RoutesNavigator';
import {useQuery} from '@apollo/client';
import {GET_ROUTES_OF_CITY} from '../../../graphql/queries/routeQueries';
import {useEffect, useState} from 'react';
import IRouteOfCity from '../../../shared/interfaces/IRouteOfCity';
import {StyleSheet} from 'react-native';
import DetailCityPill from '../components/DetailCityPill';
import TextSearch from '../components/TextSearch';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import ErrorComponent from '../../../shared/components/ErrorComponent';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
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
    async function fetchRoutes() {
      try {
        const response = await refetch();
        if (response.data && response.data.routes) {
          setRoutes(response.data.routes);
        }
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    }
    fetchRoutes();
  }, [setRoutes]);
  return (
    <SafeAreaView style={styles.page}>
      <DetailCityPill
        cityName={city.translations[user.language] || ''}
        imageUrl={city.imageUrl}
        onPress={() => navigation.navigate('ListCities')}
      />
      <View style={styles.contentContainer}>
        <TextSearch
          setTextSearch={setTextSearch}
          textSearch={textSearch}
          style={{marginTop: 15, paddingHorizontal: 15}}
        />
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorComponent
            errorMessage={t('routes.errorGettingAvailableCities')}
            onRetry={() => refetch()}
          />
        ) : (
          <View style={{flex: 1, width: '100%'}}>
            <ScrollView
              scrollEventThrottle={16}
              style={{
                width: '100%',
                marginBottom: useSafeAreaInsets().bottom + 30,
                marginTop: 15,
                backgroundColor: 'white',
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
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
  },
});
