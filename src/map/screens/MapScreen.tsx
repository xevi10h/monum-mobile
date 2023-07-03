import Geolocation from '@react-native-community/geolocation';
import Mapbox, {Camera} from '@rnmapbox/maps';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import CenterCoordinatesButton from '../components/CenterCoordinatesButton';
import FilterComponent from '../components/filter/FilterComponent';
import {MarkerComponent, MarkerProps} from '../components/Marker';
import MapPlaceDetail from '../components/placeDetail/MapPlaceDetail';
import {IFilter} from '../domain/IFilter';
import {getAllFilters, getAllMarkers} from '../services/FakeData';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmU0Z3NyMGFxeTNwbzByNW90dmdxcSJ9.cMT52Rc64Z05YUGPIutXFw',
);

interface MapScreenProps {
  setTabBarVisible: (...args: any[]) => unknown;
}

export default function MapScreen({setTabBarVisible}: MapScreenProps) {
  const mapRef = useRef(null);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [centerCamera, setCenterCamera] = useState(false);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [markerSelected, setMarkerSelected] = useState<string | null>(null);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    // const places = await PlacesService.get(filters)
    setMarkers(getAllMarkers());
  }, [filters]);

  useEffect(() => {
    if (markerSelected) {
      camera.current?.setCamera({
        animationDuration: 1000,
        zoomLevel: 7,
        centerCoordinate:
          markers?.find(m => m.id === markerSelected)?.coordinates ||
          centerCoordinates,
      });
    }
  }, [markerSelected]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log('Latitud:', latitude);
        console.log('Longitud:', longitude);
        setCenterCoordinates([longitude, latitude]);
      },
      error => {
        console.log('Error al obtener la geolocalización:', error);
        setCenterCoordinates([2.15, 41.38]);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    ),
      camera.current?.setCamera({
        animationDuration: 1000,
        zoomLevel: 5,
        centerCoordinate: centerCoordinates,
      });
    setCenterCamera(false);
  }, [centerCamera]);

  useEffect(() => {
    //Fer una crida amb un GET de posibles filtres
    setFilters(getAllFilters());
  }, []);

  return (
    <View style={styles.mapContainer}>
      <View
        style={{
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
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
          <Camera
            centerCoordinate={centerCoordinates}
            zoomLevel={5}
            animationDuration={3000}
            ref={camera}
          />
        </Mapbox.MapView>
        <FilterComponent filters={filters} setFilters={setFilters} />
        <CenterCoordinatesButton setCenterCamera={setCenterCamera} />
        <MapPlaceDetail
          placeId={markerSelected}
          setMarkerSelected={setMarkerSelected}
          setTabBarVisible={setTabBarVisible}
        />
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
