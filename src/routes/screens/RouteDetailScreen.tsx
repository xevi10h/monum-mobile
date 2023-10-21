import {Dimensions, StyleSheet, View} from 'react-native';
import {RouteDetailScreenProps} from '../navigator/RoutesNavigator';
import Mapbox, {Camera} from '@rnmapbox/maps';
import {useEffect, useRef, useState} from 'react';
import {use} from 'i18next';
import {useQuery} from '@apollo/client';
import {GET_ROUTE_DETAIL} from '../../graphql/queries/routeQueries';
import {MarkerProps} from '../../map/components/Marker';

export default function RouteDetailScreen({
  route,
  navigation,
}: RouteDetailScreenProps) {
  const mapRef = useRef(null);
  const camera = useRef<Camera>(null);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [markerSelected, setMarkerSelected] = useState<string | null>(null);
  const {loading, error, data, refetch} = useQuery(GET_ROUTE_DETAIL, {
    variables: {
      routeId: route.params.route.id,
    },
  });
  useEffect(() => {
    const fetchMarkers = async () => {
      console.log('data', data);
      if (data?.route?.stops) {
        const markersData = data?.route?.stops;
        console.log('markersData', markersData);
        setMarkers(
          markersData.map((marker: any) => ({
            id: marker.place.id,
            coordinates: [
              marker.place.address.coordinates.lng,
              marker.place.address.coordinates.lat,
            ],
            importance: marker.place.importance,
            setMarkerSelected,
            markerSelected,
          })),
        );
      }
    };
    fetchMarkers();
  }, [data]);
  console.log('route', route);
  return (
    <View>
      <View
        style={{
          height: Dimensions.get('window').height * 0.4,
          width: Dimensions.get('window').width,
        }}>
        <Mapbox.MapView
          ref={mapRef}
          styleURL="mapbox://styles/mapbox/light-v11"
          scaleBarEnabled={false}
          style={styles.mapView}>
          <Camera
            // centerCoordinate={centerCoordinates}
            zoomLevel={5}
            animationDuration={3000}
            ref={camera}
          />
        </Mapbox.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  mapView: {flex: 1, color: 'white', intensity: 0.4},
});
