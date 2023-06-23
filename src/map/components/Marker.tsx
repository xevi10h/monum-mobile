import {MarkerView} from '@rnmapbox/maps';
import {Image, View} from 'react-native';

import map_marker_importance_1 from '../../assets/images/icons/map_marker_importance_1.png';
import map_marker_importance_2 from '../../assets/images/icons/map_marker_importance_2.png';
import map_marker_importance_3 from '../../assets/images/icons/map_marker_importance_3.png';
import map_marker_importance_4 from '../../assets/images/icons/map_marker_importance_4.png';
import map_marker_importance_5 from '../../assets/images/icons/map_marker_importance_5.png';

export interface MarkerProps {
  key: string;
  coordinates: [number, number];
  importance: number;
}

export function Marker({key, coordinates, importance}: MarkerProps) {
  let source;
  switch (importance) {
    case 1:
      source = map_marker_importance_1;
      break;
    case 2:
      source = map_marker_importance_2;
      break;
    case 3:
      source = map_marker_importance_3;
      break;
    case 4:
      source = map_marker_importance_4;
      break;
    case 5:
      source = map_marker_importance_5;
      break;
    default:
      source = map_marker_importance_1;
      break;
  }
  return (
    <MarkerView key={key} coordinate={coordinates}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <Image source={source} resizeMode={'contain'} />
      </View>
    </MarkerView>
  );
}
