import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useQuery} from '@apollo/client';
import TextSearch from '../components/TextSearch';
import {t} from 'i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {GET_CITIES} from '../../graphql/queries/routeQueries';
import LoadingSpinner from '../../shared/components/LoadingSpinner';
import ErrorComponent from '../../shared/components/ErrorComponent';
import ICity from '../domain/ICity';
import CityPill from '../components/CityPill';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/store';

export default function CitiesScreen() {
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
            }}
            showsVerticalScrollIndicator={false}>
            {cities.map((city, i) => (
              <CityPill
                key={i}
                onPress={() => 'sss'}
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
    paddingHorizontal: 15,
    alignItems: 'center',
  },
});
