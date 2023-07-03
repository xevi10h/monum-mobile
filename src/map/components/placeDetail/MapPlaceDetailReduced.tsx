import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
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
import {IPlace} from 'src/map/domain/IPlace';

import place_pre_detail_arrow_top from '../../../assets/images/icons/place_pre_detail_arrow_top.png';
import place_pre_detail_importance_1 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_1.png';
import place_pre_detail_importance_2 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_2.png';
import place_pre_detail_importance_3 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_3.png';
import place_pre_detail_importance_4 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_4.png';
import place_pre_detail_importance_5 from '../../../assets/images/icons/placeImportance/place_pre_detail_importance_5.png';
import {getPlaceInformation} from '../../services/FakeData';
import ShowRatingStars from '../ShowRatingStars';

const SHEET_OCUPIED_HEIGHT = 150;
const BOTTOM_TAB_HEIGHT_OCUPIED = 60;
const BORDER_RADIUS = 24;

type GestureContext = {
  startY: number;
};

interface MapPlaceDetailReducedProps {
  importanceIcon: ImageSourcePropType;
  placeId: string | null;
  setMarkerSelected: (...args: any[]) => unknown;
  setTabBarVisible: (...args: any[]) => unknown;
  setShowPlaceDetailExpanded: (...args: any[]) => unknown;
}

export default function MapPlaceDetailReduced({
  importanceIcon,
  placeId,
  setMarkerSelected,
  setTabBarVisible,
  setShowPlaceDetailExpanded,
}: MapPlaceDetailReducedProps) {
  const BOTTOM_TAB_HEIGHT =
    useSafeAreaInsets().bottom + BOTTOM_TAB_HEIGHT_OCUPIED - BORDER_RADIUS;
  const SHEET_OPEN_HEIGHT = BOTTOM_TAB_HEIGHT;
  const SHEET_CLOSED_HEIGHT = BOTTOM_TAB_HEIGHT - SHEET_OCUPIED_HEIGHT;

  const [arrowDown, setArrowDown] = useState(false);
  const [placeInformation, setPlaceInformation] = useState<IPlace>();
  const position = useSharedValue(SHEET_CLOSED_HEIGHT);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startY = position.value;
    },
    onActive: (event, context) => {
      const newPosition = context.startY - event.translationY;
      if (newPosition > SHEET_OPEN_HEIGHT) {
        position.value = SHEET_OPEN_HEIGHT;
      } else if (newPosition < SHEET_CLOSED_HEIGHT) {
        position.value = SHEET_CLOSED_HEIGHT;
      } else {
        position.value = newPosition;
      }
      event.translationY > 0
        ? runOnJS(setArrowDown)(true)
        : runOnJS(setArrowDown)(false);
    },
    onEnd: event => {
      if (-position.value > SHEET_OCUPIED_HEIGHT / 2 || event.velocityY > 0) {
        position.value = withTiming(SHEET_CLOSED_HEIGHT);
        runOnJS(setMarkerSelected)(null);
      } else {
        runOnJS(setArrowDown)(false);
        position.value = withTiming(SHEET_OPEN_HEIGHT);
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: position.value,
    };
  });
  useEffect(() => {
    if (placeId) {
      // TO DO: Change it for a call to the API
      const placeInformation = {};
      console.log('placeId', placeId);
      if (placeInformation) {
        setPlaceInformation(getPlaceInformation());
        setArrowDown(false);
        position.value = withTiming(SHEET_OPEN_HEIGHT, {duration: 300});
      }
    } else {
      position.value = SHEET_CLOSED_HEIGHT;
      setTabBarVisible(true);
      setShowPlaceDetailExpanded(false);
    }
  }, [placeId, position]);
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0.7}}
          colors={['#0004', '#0000']}
          style={styles.linearGradient}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowPlaceDetailExpanded(true);
              setTabBarVisible(false);
            }}>
            <View style={styles.arrowContainer}>
              <Image
                source={place_pre_detail_arrow_top}
                style={[
                  styles.arrowIcon,
                  {transform: [{rotate: arrowDown ? '180deg' : '0deg'}]},
                ]}
                resizeMode="cover"
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.informationContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: placeInformation?.imageUrl,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.textInformationContainer}>
              <Text style={styles.textPlaceName}>{placeInformation?.name}</Text>
              <Text
                style={
                  styles.textPlaceAddress
                }>{`${placeInformation?.address.city}, ${placeInformation?.address.country}`}</Text>
              <ShowRatingStars rating={placeInformation?.rating || 0} />
            </View>
            <View style={styles.importanceIconContainer}>
              <Image
                source={importanceIcon}
                resizeMode="contain"
                style={styles.importanceIconImage}
              />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </PanGestureHandler>
  );
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
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: '7%',
  },
  arrowContainer: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
  },
  arrowIcon: {
    height: 24,
    width: 24,
  },
  informationContainer: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: '6%',
    paddingTop: 10,
  },
  imageContainer: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textInformationContainer: {
    flex: 4,
    justifyContent: 'space-between',
    height: '100%',
  },
  textPlaceName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#032000',
  },
  textPlaceAddress: {
    fontSize: 16,
    color: '#032000',
  },
  importanceIconContainer: {flex: 1, marginHorizontal: '6%'},
  importanceIconImage: {width: 40, height: 40},
});
