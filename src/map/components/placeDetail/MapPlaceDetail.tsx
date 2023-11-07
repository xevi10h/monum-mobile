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
import IMedia from '../../../shared/interfaces/IMedia';
import IPlace from '../../../shared/interfaces/IPlace';

import MapPlaceDetailExpanded from './MapPlaceDetailExpanded';
import MapPlaceDetailReduced from './MapPlaceDetailReduced';
import MapServices from '../../services/MapServices';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import user from 'src/redux/states/user';

const {height} = Dimensions.get('window');

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;
const BOTTOM_TAB_HEIGHT = 120;
const MAX_MARGIN_TOP = 50;

interface MapPlaceDetailProps {
  placeId: string | null;
  setMarkerSelected: Dispatch<SetStateAction<string | null>>;
  setTabBarVisible: Dispatch<SetStateAction<boolean>>;
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
  place,
  setPlace,
}: MapPlaceDetailProps) {
  const BOTTOM_TOTAL_TAB_HEIGHT =
    useSafeAreaInsets().bottom +
    BOTTOM_TAB_NAVIGATOR_HEIGHT +
    BOTTOM_TAB_HEIGHT;

  const [showPlaceDetailExpanded, setShowPlaceDetailExpanded] = useState(false);
  const [closeDetail, setCloseDetail] = useState(false);
  const [placeMedia, setPlaceMedia] = useState<IMedia[] | undefined>(undefined);
  const position = useSharedValue(height);

  const userLanguage =
    useSelector((state: RootState) => state.user.language) || 'en_US';

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
    if (showPlaceDetailExpanded) {
      return {
        marginTop: position.value,
        top: 0,
        height,
      };
    }
    return {
      top: position.value,
      height: height - position.value,
    };
  });

  useEffect(() => {
    if (placeId) {
      // TO DO: Change it for a call to the API
      const placeInfo = {};
      if (placeInfo) {
        const fetchPlace = async () => {
          const placeData = await MapServices.getPlaceInfo(placeId);
          setPlace(placeData);
        };
        fetchPlace();
        position.value = withTiming(height - BOTTOM_TOTAL_TAB_HEIGHT, {
          duration: 300,
        });
      }
    }
  }, [placeId]);

  useEffect(() => {
    if (place && showPlaceDetailExpanded) {
      const fetchPlaceMedia = async () => {
        const placeMedia = await MapServices.getPlaceMedia(
          place.id,
          userLanguage,
        );
        setPlaceMedia(placeMedia);
      };
      fetchPlaceMedia();
      position.value = withTiming(MAX_MARGIN_TOP, {duration: 300});
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
          {showPlaceDetailExpanded && place && Array.isArray(placeMedia) ? (
            <MapPlaceDetailExpanded
              placeMedia={placeMedia}
              importanceIcon={importanceIcon()}
              place={place}
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
