import Geolocation from '@react-native-community/geolocation';
import {Image, TouchableOpacity} from 'react-native';

import map_center_coordinates from '../../assets/images/icons/map_center_coordinates.png';
import {styles} from '../styles/MapStyles';

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
