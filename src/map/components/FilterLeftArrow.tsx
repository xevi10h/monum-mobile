import {GestureResponderEvent, Image, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import map_filter_arrow_right from '../../assets/images/icons/map_filter_arrow_right.png';
import {styles} from '../styles/MapStyles';

interface FilterArrowPillToRightProps {
  onPress?: (event: GestureResponderEvent) => void;
}

export default function FilterArrowPillToRight({
  onPress,
}: FilterArrowPillToRightProps) {
  return (
    <TouchableOpacity
      style={[styles.filterLeftArrow, {top: useSafeAreaInsets().top}]}
      onPress={onPress}>
      <Image
        source={map_filter_arrow_right}
        style={styles.filterArrowIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
