import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import place_pre_detail_importance_1 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_1.png';
import place_pre_detail_importance_2 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_2.png';
import place_pre_detail_importance_3 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_3.png';
import place_pre_detail_importance_4 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_4.png';
import place_pre_detail_importance_5 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_5.png';
import IMedia from '../../domain/IMedia';
import IPlace from '../../domain/IPlace';
import {getPlaceInfo, getPlaceMedia} from '../../services/FakeData';

import MapPlaceDetailExpanded from './MapPlaceDetailExpanded';
import MapPlaceDetailReduced from './MapPlaceDetailReduced';

const {height} = Dimensions.get('window');

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;
const BOTTOM_TAB_HEIGHT = 120;
const MAX_MARGIN_TOP = 50;

interface MapPlaceDetailProps {
  placeId: string | null;
  setMarkerSelected: Dispatch<SetStateAction<string | null>>;
  setTabBarVisible: Dispatch<SetStateAction<boolean>>;
  setMedia: Dispatch<SetStateAction<IMedia | null>>;
  place: IPlace | null;
  setPlace: Dispatch<SetStateAction<IPlace | null>>;
}

type GestureContext = {
  startY: number;
};

export default function MapPlaceDetail({
  placeId,
  setMarkerSelected,
  setTabBarVisible,
  setMedia,
  place,
  setPlace,
}: MapPlaceDetailProps) {
  const BOTTOM_TOTAL_TAB_HEIGHT =
    useSafeAreaInsets().bottom +
    BOTTOM_TAB_NAVIGATOR_HEIGHT +
    BOTTOM_TAB_HEIGHT;

  const [showPlaceDetailExpanded, setShowPlaceDetailExpanded] = useState(false);
  const [closeDetail, setCloseDetail] = useState(false);
  const [placeMedia, setPlaceMedia] = useState<IMedia[]>([]);
  const position = useSharedValue(height);

  const importanceIcon = () => {
    switch (place?.importance) {
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

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startY = position.value;
    },
    onActive: (event, context) => {
      const newPosition = context.startY + event.translationY;
      if (!showPlaceDetailExpanded) {
        if (height - newPosition >= BOTTOM_TOTAL_TAB_HEIGHT) {
          position.value = height - BOTTOM_TOTAL_TAB_HEIGHT;
        } else {
          position.value = newPosition;
        }
      } else {
        if (newPosition <= MAX_MARGIN_TOP) {
          position.value = MAX_MARGIN_TOP;
        } else {
          position.value = newPosition;
        }
      }
    },
    onEnd: event => {
      if (!showPlaceDetailExpanded) {
        if (
          position.value > height - BOTTOM_TOTAL_TAB_HEIGHT / 2 ||
          event.velocityY > 0
        ) {
          position.value = withTiming(height);
          runOnJS(setCloseDetail)(true);
          runOnJS(setTabBarVisible)(true);
        } else {
          position.value = withTiming(height - BOTTOM_TOTAL_TAB_HEIGHT);
        }
      } else {
        if (position.value > height / 2 || event.velocityY > 0) {
          position.value = withTiming(height);
          runOnJS(setCloseDetail)(true);
          runOnJS(setShowPlaceDetailExpanded)(false);
          runOnJS(setTabBarVisible)(true);
        } else {
          position.value = withTiming(MAX_MARGIN_TOP);
        }
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    if (position.value === height && closeDetail === true) {
      runOnJS(setMarkerSelected)(null);
      runOnJS(setCloseDetail)(false);
    }
    return {
      marginTop: position.value,
    };
  });

  useEffect(() => {
    if (placeId) {
      // TO DO: Change it for a call to the API
      const placeInfo = {};
      if (placeInfo) {
        setPlace(getPlaceInfo());
        position.value = withTiming(height - BOTTOM_TOTAL_TAB_HEIGHT, {
          duration: 300,
        });
      }
    }
  }, [placeId]);

  useEffect(() => {
    if (place && showPlaceDetailExpanded) {
      // TO DO: Change it for a call to the API
      const placeMedia = {};
      if (place) {
        setPlaceMedia(getPlaceMedia());
        position.value = withTiming(MAX_MARGIN_TOP, {duration: 300});
      }
    }
  }, [showPlaceDetailExpanded, place]);

  return placeId ? (
    <View
      style={[
        styles.container,
        {
          backgroundColor: showPlaceDetailExpanded
            ? 'rgba(0, 0, 0, 0.8)'
            : 'rgba(0, 0, 0, 0)',
        },
      ]}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.animatedContainer, animatedStyle]}>
          {showPlaceDetailExpanded && place ? (
            <MapPlaceDetailExpanded
              placeMedia={placeMedia}
              importanceIcon={importanceIcon()}
              place={place}
              setMedia={setMedia}
              setPlace={setPlace}
            />
          ) : (
            <MapPlaceDetailReduced
              importanceIcon={importanceIcon()}
              setTabBarVisible={setTabBarVisible}
              setShowPlaceDetailExpanded={setShowPlaceDetailExpanded}
              place={place}
            />
          )}
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  animatedContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});
