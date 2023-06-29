import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

export default function ProfileScreen() {
  useEffect(() => {}, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.map}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  map: {
    flex: 1,
    backgroundColor: '#3F713B',
  },
});
