import Mapbox, {StyleURL} from '@rnmapbox/maps';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

Mapbox.setAccessToken(
  'pk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmU0Z3NyMGFxeTNwbzByNW90dmdxcSJ9.cMT52Rc64Z05YUGPIutXFw',
);

// sk.eyJ1IjoieHBsb3JlYXIiLCJhIjoiY2xqMmVqOHg1MGF4czNqbzB3eDN2end6OSJ9.Cy_Y7Z44Y-SP4ron5L2w7w

export default function MapScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          // styleURL={StyleURL.Street}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  map: {
    flex: 1,
  },
});
