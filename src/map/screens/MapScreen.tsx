import Geolocation from '@react-native-community/geolocation';
import Mapbox, {Camera, MapView} from '@rnmapbox/maps';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View} from 'react-native';

import CenterCoordinatesButton from '../components/CenterCoordinatesButton';
import FilterComponent from '../components/FilterComponent';
import MapPlaceDetail from '../components/MapPlaceDetail';
import {MarkerComponent, MarkerProps} from '../components/Marker';
import {styles} from '../styles/MapStyles';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmU0Z3NyMGFxeTNwbzByNW90dmdxcSJ9.cMT52Rc64Z05YUGPIutXFw',
);

interface MapScreenProps {
  setTabBarVisible: (...args: any[]) => unknown;
}

export default function MapScreen({setTabBarVisible}: MapScreenProps) {
  const mapRef = useRef(null);
  const [showPlaceDetail, setShowPlaceDetail] = useState(false);
  const [filters, setFilters] = useState(['']);
  const [centerCamera, setCenterCamera] = useState(false);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [coordinatesLoaded, setCoordinatesLoaded] = useState(false);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [markerSelected, setMarkerSelected] = useState<string | null>(null);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    // const places = await PlacesService.get(filters)
    setMarkers([
      {
        id: '1',
        coordinates: [-124.032, 38.7272],
        importance: 5,
        setMarkerSelected,
      },
      {
        id: '2',
        coordinates: [-125.032, 37.5272],
        importance: 4,
        setMarkerSelected,
      },
      {
        id: '3',
        coordinates: [-127.032, 38.7272],
        importance: 3,
        setMarkerSelected,
      },
      {
        id: '4',
        coordinates: [-128.032, 38.9272],
        importance: 2,
        setMarkerSelected,
      },
      {
        id: '5',
        coordinates: [-123.032, 36.9272],
        importance: 1,
        setMarkerSelected,
      },
    ]);
    setCoordinatesLoaded(true);
  }, [filters]);

  useEffect(() => {
    console.log(4);
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
        <FilterComponent />
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
