import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import place_pre_detail_arrow_top from '../../../assets/images/icons/place_pre_detail_arrow_top.png';
import place_pre_detail_importance_1 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_1.png';
import place_pre_detail_importance_2 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_2.png';
import place_pre_detail_importance_3 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_3.png';
import place_pre_detail_importance_4 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_4.png';
import place_pre_detail_importance_5 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_5.png';
import {IPlace} from '../../domain/IPlace';
import {getPlaceInformation} from '../../services/FakeData';
import ShowRatingStar from '../ShowRatingStars';

import MapPlaceDetailExpanded from './MapPlaceDetailExpanded';
import MapPlaceDetailReduced from './MapPlaceDetailReduced';
const SHEET_OCUPIED_HEIGHT = 150;
const BOTTOM_TAB_HEIGHT_OCUPIED = 60;
const BORDER_RADIUS = 24;

interface MapPlaceDetailProps {
  placeId: string | null;
  setMarkerSelected: (...args: any[]) => unknown;
  setTabBarVisible: (...args: any[]) => unknown;
}

export default function MapPlaceDetail({
  placeId,
  setMarkerSelected,
  setTabBarVisible,
}: MapPlaceDetailProps) {
  const BOTTOM_TAB_HEIGHT =
    useSafeAreaInsets().bottom + BOTTOM_TAB_HEIGHT_OCUPIED - BORDER_RADIUS;
  const SHEET_OPEN_HEIGHT = BOTTOM_TAB_HEIGHT;
  const SHEET_CLOSED_HEIGHT = BOTTOM_TAB_HEIGHT - SHEET_OCUPIED_HEIGHT;

  const [arrowDown, setArrowDown] = useState(false);
  const [showPlaceDetailExpanded, setShowPlaceDetailExpanded] = useState(false);
  const [placeInformation, setPlaceInformation] = useState<IPlace>();

  const position = useSharedValue(SHEET_CLOSED_HEIGHT);

  const importanceIcon = () => {
    switch (placeInformation?.importance) {
      case 1:
        return place_pre_detail_importance_1;
      case 2:
        return place_pre_detail_importance_2;
      case 3:
        return place_pre_detail_importance_3;
      case 4:
        return place_pre_detail_importance_4;
      case 5:
        return place_pre_detail_importance_5;
      default:
        return place_pre_detail_importance_1;
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: position.value,
    };
  });

  return placeId ? (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: showPlaceDetailExpanded
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(0, 0, 0, 0)',
        top: 0,
      }}>
      {showPlaceDetailExpanded && placeInformation ? (
        <MapPlaceDetailExpanded
          importanceIcon={importanceIcon()}
          placeInformation={placeInformation}
          setMarkerSelected={setMarkerSelected}
          setTabBarVisible={setTabBarVisible}
          setShowPlaceDetailExpanded={setShowPlaceDetailExpanded}
        />
      ) : (
        <MapPlaceDetailReduced
          importanceIcon={importanceIcon()}
          placeId={placeId}
          setMarkerSelected={setMarkerSelected}
          setTabBarVisible={setTabBarVisible}
          setShowPlaceDetailExpanded={setShowPlaceDetailExpanded}
        />
      )}
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: SHEET_OCUPIED_HEIGHT,
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});
