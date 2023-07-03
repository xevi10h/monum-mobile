import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native';

import map_center_coordinates from '../../assets/images/icons/map_center_coordinates.png';

interface CenterCoordinatesButtonProps {
  setCenterCamera: any;
}

export default function CenterCoordinatesButton({
  setCenterCamera,
}: CenterCoordinatesButtonProps) {
  return (
    <TouchableOpacity
      style={styles.centerCoordinatesContainer}
      onPress={() => {
        setCenterCamera(true);
      }}>
      <Image
        source={map_center_coordinates}
        style={styles.centerCoordinatesIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerCoordinatesContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 10,
    bottom: Dimensions.get('window').height * 0.15,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  centerCoordinatesIcon: {
    width: 32,
    height: 32,
  },
});
