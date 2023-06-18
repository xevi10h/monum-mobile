import Mapbox, {StyleURL} from '@rnmapbox/maps';
import React from 'react';
import {StyleSheet, View} from 'react-native';

Mapbox.setAccessToken(
  'sk.eyJ1IjoieGV2aWh0IiwiYSI6ImNsajF1bW9wMjA1ZjAzY28weDExdTk1M2wifQ.cn_vkVvxv31jJC4VH7R_Pg',
);

export default function MapScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          styleURL={StyleURL.Street} // Aquí configuramos el estilo explícitamente.
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
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
