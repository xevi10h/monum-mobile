import Geolocation from '@react-native-community/geolocation';
import Mapbox from '@rnmapbox/maps';
import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';

import map_filter_arrow_right from '../../assets/images/icons/map_filter_arrow_right.png';
import CenterCoordinatesButton from '../components/CenterCoordinatesButton';
import FilterComponent from '../components/FilterComponent';
import {Marker, MarkerProps} from '../components/Marker';
import {styles} from '../styles/MapStyles';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmU0Z3NyMGFxeTNwbzByNW90dmdxcSJ9.cMT52Rc64Z05YUGPIutXFw',
);

export default function MapScreen() {
  const [filters, setFilters] = useState(['']);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);

  useEffect(() => {
    // const places = await PlacesService.get(filters)
    setMarkers([
      {
        key: '1',
        coordinates: [-124.032, 38.7272],
        importance: 5,
      },
      {
        key: '2',
        coordinates: [-125.032, 37.5272],
        importance: 4,
      },
      {
        key: '3',
        coordinates: [-127.032, 38.7272],
        importance: 3,
      },
      {
        key: '4',
        coordinates: [-128.032, 38.9272],
        importance: 2,
      },
      {
        key: '5',
        coordinates: [-123.032, 36.9272],
        importance: 1,
      },
    ]);
  }, [filters]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitud:', latitude);
        console.log('Longitud:', longitude);
        setCoordinates([longitude, latitude]);
      },
      error => {
        console.log('Error al obtener la geolocalización:', error);
        setCoordinates([2.15, 41.38]);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <View style={styles.mapContainer}>
      <Mapbox.MapView
        styleURL="mapbox://styles/mapbox/light-v11"
        scaleBarEnabled={false}
        style={styles.mapView}>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            importance={marker.importance}
            coordinates={marker.coordinates}
          />
        ))}
        <Mapbox.Camera zoomLevel={5} centerCoordinate={coordinates} />
      </Mapbox.MapView>
      <FilterComponent />
      <CenterCoordinatesButton />
    </View>
  );
}
