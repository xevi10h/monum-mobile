import {Image, TouchableOpacity} from 'react-native';

import map_center_coordinates from '../../assets/images/icons/map_center_coordinates.png';
import {styles} from '../styles/MapStyles';

export default function CenterCoordinatesButton() {
  return (
    <TouchableOpacity style={styles.centerCoordinatesContainer}>
      <Image
        source={map_center_coordinates}
        style={styles.centerCoordinatesIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
