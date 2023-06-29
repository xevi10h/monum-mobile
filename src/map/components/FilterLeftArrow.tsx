import {GestureResponderEvent, Image, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import map_filter_arrow_right from '../../assets/images/icons/map_filter_arrow_right.png';
import {styles} from '../styles/MapStyles';

interface FilterLeftArrowProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export default function FilterLeftArrow({onPress}: FilterLeftArrowProps) {
  return (
    <TouchableOpacity
      style={[
        styles.filterArrow,
        {
          top: useSafeAreaInsets().top,
          left: 10,
          transform: [{rotate: '180deg'}],
        },
      ]}
      onPress={onPress}>
      <Image
        source={map_filter_arrow_right}
        style={styles.filterArrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
