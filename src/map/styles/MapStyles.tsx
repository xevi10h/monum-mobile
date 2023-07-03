import {Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
  },
  mapView: {flex: 1, color: 'white', intensity: 0.4},
  centerCoordinatesContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: Dimensions.get('window').height * 0.06,
    height: Dimensions.get('window').height * 0.06,
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
    width: '65%',
    height: '65%',
  },
  filterContainer: {
    position: 'absolute',
  },
  filterPill: {
    borderRadius: 10,
    paddingVertical: 5,
    height: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    marginHorizontal: 10,
    marginVertical: 30,
  },
  filterPillText: {
    textAlign: 'center',
    marginHorizontal: 10,
  },
  placeIcon: {
    width: 100,
    height: 100,
  },
});
