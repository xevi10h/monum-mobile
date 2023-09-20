import Geolocation from '@react-native-community/geolocation';
import Mapbox, {Camera} from '@rnmapbox/maps';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

import CenterCoordinatesButton from '../components/CenterCoordinatesButton';
import FilterComponent from '../components/filter/FilterComponent';
import {MarkerComponent, MarkerProps} from '../components/Marker';
import MapPlaceDetail from '../components/placeDetail/MapPlaceDetail';
import IFilter from '../domain/IFilter';
import {getAllFilters} from '../services/FakeData';
import MapServices from '../services/MapServices';
import IPlace from '../domain/IPlace';
import IMedia from '../domain/IMedia';
import AsyncStorage from '@react-native-async-storage/async-storage';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmU0Z3NyMGFxeTNwbzByNW90dmdxcSJ9.cMT52Rc64Z05YUGPIutXFw',
);

interface MapScreenProps {
  setTabBarVisible: Dispatch<SetStateAction<boolean>>;
  setMedia: Dispatch<SetStateAction<IMedia | null>>;
  setPlace: Dispatch<SetStateAction<IPlace | null>>;
  place: IPlace | null;
}

export default function MapScreen({
  setTabBarVisible,
  setMedia,
  setPlace,
  place,
}: MapScreenProps) {
  const mapRef = useRef(null);
  const [filters, setFilters] = useState<IFilter[]>([]);
  const [centerCamera, setCenterCamera] = useState(false);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const [markerSelected, setMarkerSelected] = useState<string | null>(null);
  const camera = useRef<Camera>(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markersData = await MapServices.getAllMarkers();
      setMarkers(
        markersData.map(marker => ({
          id: marker.id,
          coordinates: [
            marker.address.coordinates.lng,
            marker.address.coordinates.lat,
          ],
          importance: marker.importance,
          setMarkerSelected,
          markerSelected,
        })),
      );
    };
    fetchMarkers();
  }, [filters]);

  useEffect(() => {
    if (markerSelected) {
      camera.current?.setCamera({
        animationDuration: 1000,
        zoomLevel: 12,
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
        setCenterCoordinates([longitude, latitude]);
      },
      error => {
        console.log('Error obtaining geolocation:', error);
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
          setMedia={setMedia}
          setPlace={setPlace}
          place={place}
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
