import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {RouteDetailScreenProps} from '../navigator/RoutesNavigator';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import React, {useEffect, useRef, useState} from 'react';
import media_bubble_back from '../../assets/images/icons/media_bubble_back.png';
import {useQuery} from '@apollo/client';
import {GET_ROUTE_DETAIL} from '../../graphql/queries/routeQueries';
import {MarkerComponent} from '../../map/components/Marker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RatingPill from '../components/RatingPill';
import TextSearch from '../components/TextSearch';
import {IMarker} from '../../shared/interfaces/IMarker';
import PlaceFromRoutePill, {
  PlaceFromRoutePillRef,
} from '../components/placeFromRoutePill/PlaceFromRoutePill';
import IPlaceFromRoute from '../../shared/interfaces/IPlaceFromRoute';
import IStop from '../../shared/interfaces/IStop';
import CenterCoordinatesButton from '../components/CenterCoordinatesButton';
import Geolocation from '@react-native-community/geolocation';
import CurrentPositionMarker from '../../map/components/CurrentPositionMarker';
import LinearGradient from 'react-native-linear-gradient';

export default function RouteDetailScreen({
  route,
  navigation,
}: RouteDetailScreenProps) {
  const mapRef = useRef<MapView>(null);
  const camera = useRef<Camera>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [key, setKey] = useState(0);
  const [centerCamera, setCenterCamera] = useState(false);

  const [originalData, setOriginalData] = useState<any | null>(null);
  const [markers, setMarkers] = useState<IMarker[]>([]);
  const [placesFromRoute, setPlacesFromRoute] = useState<IPlaceFromRoute[]>();
  const [centerCoordinates, setCenterCoordinates] = useState<[number, number]>([
    0, 0,
  ]);
  const [markerSelected, setMarkerSelected] = useState<string | null>(null);
  const [textSearch, setTextSearch] = useState<string | undefined>(undefined);
  const {loading, error, data, refetch} = useQuery(GET_ROUTE_DETAIL, {
    variables: {
      routeId: route.params.route.id,
    },
  });

  useEffect(() => {
    if (data) {
      setOriginalData(data);
    }
  }, [data]);

  useEffect(() => {
    if (Array.isArray(markers) && markers.length > 0) {
      // Calculate the center of the markers
      const centerLat =
        markers.reduce((acc, marker) => acc + marker.coordinates[1], 0) /
        markers.length;
      const centerLng =
        markers.reduce((acc, marker) => acc + marker.coordinates[0], 0) /
        markers.length;
      setCenterCoordinates([centerLng, centerLat]);

      // Find the limits of the markers
      let minLng = markers[0]?.coordinates[0];
      let maxLng = markers[0]?.coordinates[0];
      let minLat = markers[0]?.coordinates[1];
      let maxLat = markers[0]?.coordinates[1];

      markers.forEach(marker => {
        if (marker.coordinates[0] < minLng) minLng = marker.coordinates[0];
        if (marker.coordinates[0] > maxLng) maxLng = marker.coordinates[0];
        if (marker.coordinates[1] < minLat) minLat = marker.coordinates[1];
        if (marker.coordinates[1] > maxLat) maxLat = marker.coordinates[1];
      });

      const southWest = [minLng, minLat];
      const northEast = [maxLng, maxLat];
      camera.current?.fitBounds(southWest, northEast, 100, 0);
    }
  }, [markers]);

  useEffect(() => {
    if (originalData) {
      const stops = originalData?.route?.stops;
      const filteredStops = textSearch
        ? stops.filter(
            (marker: IStop) =>
              marker?.media?.place?.name
                .toLowerCase()
                .includes(textSearch.toLowerCase()) ||
              marker?.media?.place?.description
                .toLowerCase()
                .includes(textSearch.toLowerCase()),
          )
        : stops;

      const markers = filteredStops.map((marker: any) => ({
        id: marker.media.place.id,
        coordinates: [
          marker.media.place.address.coordinates.lng,
          marker.media.place.address.coordinates.lat,
        ],
        importance: marker.media.place.importance,
        setMarkerSelected,
        markerSelected,
      }));
      setMarkers(markers);

      const placesFromRouteData = filteredStops.reduce(
        (prev: IPlaceFromRoute[], curr: any) => {
          const placeFromRoute = prev.find(
            placeFromRoute => placeFromRoute.place.id === curr.media.place.id,
          );
          if (placeFromRoute) {
            placeFromRoute.medias.push(curr.media);
          } else {
            prev.push({
              place: curr.media.place,
              medias: [curr.media],
            });
          }
          return prev;
        },
        [],
      );
      setPlacesFromRoute(placesFromRouteData);
    }
  }, [textSearch, originalData]);

  useEffect(() => {
    // Inicializamos las referencias para los elementos de placesFromRoute solo si aún no existen
    placesFromRoute?.forEach(placeFromRoute => {
      const placeId = placeFromRoute.place.id;
      if (!pillRefs.get(placeId)) {
        pillRefs.set(placeId, React.createRef());
      }
    });
  }, [placesFromRoute]);

  useEffect(() => {
    async function scrollMarkers() {
      if (markerSelected) {
        let height = 0;
        for (const marker of markers) {
          if (marker.id === markerSelected) break;
          const pillRef = pillRefs.get(marker.id)?.current;
          height += pillRef?.isExpanded ? 230 : 80;
        }
        pillRefs.get(markerSelected)?.current?.expandPill();
        pillRefs.get(markerSelected)?.current?.highlightPill();
        scrollViewRef.current?.scrollTo({y: height, animated: true});
        // forceRender();
      }
    }
    scrollMarkers();
  }, [markerSelected]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // setCenterCoordinates([longitude, latitude]);
        setCenterCoordinates([2.15, 41.38]); // Barcelona
      },
      error => {
        console.log('Error obtaining geolocation:', error);
        setCenterCoordinates([2.15, 41.38]);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    ),
      camera.current?.setCamera({
        animationDuration: 1000,
        zoomLevel: 15,
        centerCoordinate: centerCoordinates,
      });
    setCenterCamera(false);
  }, [centerCamera]);

  const pillRefs = useRef<Map<string, React.RefObject<PlaceFromRoutePillRef>>>(
    new Map(),
  ).current;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View
        style={{
          height: Dimensions.get('window').height * 0.4,
          width: Dimensions.get('window').width,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 4,
        }}>
        <Mapbox.MapView
          ref={mapRef}
          styleURL="mapbox://styles/mapbox/light-v11"
          scaleBarEnabled={false}
          style={styles.mapView}>
          {markers.map(marker => (
            <MarkerComponent
              key={marker.id}
              id={marker.id}
              importance={marker.importance}
              coordinates={marker.coordinates}
              selected={markerSelected === marker.id ? true : false}
              setMarkerSelected={setMarkerSelected}
            />
          ))}
          {centerCoordinates && (
            <CurrentPositionMarker centerCoordinates={centerCoordinates} />
          )}
          <Camera
            centerCoordinate={centerCoordinates}
            ref={camera}
            animationMode={'none'}
            animationDuration={0}
          />
        </Mapbox.MapView>
        <CenterCoordinatesButton setCenterCamera={setCenterCamera} />
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.contentContainer}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => navigation.goBack()}>
                <Image
                  source={media_bubble_back}
                  style={{height: 14, width: 8}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#032000',
                  fontFamily: 'Montserrat',
                  fontSize: 18,
                }}>
                {route.params.route.title}
              </Text>
            </View>
            <RatingPill number={route.params.route.rating || 0} />
          </View>
          <TextSearch setTextSearch={setTextSearch} textSearch={textSearch} />
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            key={key}
            style={{
              borderRadius: 12,
              paddingTop: 15,
              width: '100%',
              marginBottom: useSafeAreaInsets().bottom + 40,
              marginTop: 10,
              paddingHorizontal: 12,
            }}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            ref={scrollViewRef}>
            {placesFromRoute?.map((placeFromRoute, index) => (
              <PlaceFromRoutePill
                ref={pillRefs.get(placeFromRoute.place.id)}
                key={placeFromRoute.place.id}
                style={
                  index === 0
                    ? {marginTop: -10}
                    : index === placesFromRoute.length - 1
                    ? {paddingBottom: 40}
                    : {}
                }
                {...placeFromRoute}
              />
            ))}
          </ScrollView>
        </View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.02}}
          colors={['rgba(0,0,0,0.2)', 'transparent']}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  mapView: {color: 'white', intensity: 0.4, flex: 1},
  contentContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  mediaPillRatingContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    height: 20,
    width: 30,
    backgroundColor: '#3F713B',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  mediaPillRatingText: {
    fontSize: 8,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  mediaPillRatingImage: {width: 8, height: 8},
});
