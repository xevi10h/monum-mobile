import {
  Dimensions,
  GestureResponderEvent,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import map_filter_arrow_right from '../../assets/images/icons/map_filter_arrow_right.png';
import {styles} from '../styles/MapStyles';

interface FilterRightArrowProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export default function FilterRightArrow({onPress}: FilterRightArrowProps) {
  return (
    <TouchableOpacity
      style={[styles.filterArrow, {top: useSafeAreaInsets().top, right: -10}]}
      onPress={onPress}>
      <Image
        source={map_filter_arrow_right}
        style={styles.filterArrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
