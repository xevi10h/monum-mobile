import {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
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

import place_pre_detail_arrow_top from '../../assets/images/icons/place_pre_detail_arrow_top.png';
import place_pre_detail_importance_1 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_1.png';
import place_pre_detail_importance_2 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_2.png';
import place_pre_detail_importance_3 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_3.png';
import place_pre_detail_importance_4 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_4.png';
import place_pre_detail_importance_5 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_5.png';
import {IPlace} from '../domain/IPlace';

import MapPlaceDetailExtended from './MapPlaceDetailExtended';
import ShowRatingStar from './ShowRatingStars';
const {height} = Dimensions.get('window');

const BOTTOM_TAB_HEIGHT = 70 - 24;
const SHEET_OCUPIED_HEIGHT = 150;
const SHEET_OPEN_HEIGHT = BOTTOM_TAB_HEIGHT;
const SHEET_CLOSED_HEIGHT = BOTTOM_TAB_HEIGHT - SHEET_OCUPIED_HEIGHT;

interface MapPlaceDetailProps {
  placeId: string | null;
  setMarkerSelected: (...args: any[]) => unknown;
  setTabBarVisible: (...args: any[]) => unknown;
}

type GestureContext = {
  startY: number;
};

export default function MapPlaceDetail({
  placeId,
  setMarkerSelected,
  setTabBarVisible,
}: MapPlaceDetailProps) {
  const [arrowDown, setArrowDown] = useState(false);
  const [showPlaceDetailExtended, setShowPlaceDetailExtended] = useState(false);

  const [placeInformation, setPlaceInformation] = useState<IPlace>();

  const position = useSharedValue(SHEET_CLOSED_HEIGHT);

  // const [showDetailExtended, setShowDetailExtended] = useState(false);

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
      console.log(event.velocityY);
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
        setPlaceInformation({
          name: 'La Sagrada Familia',
          rating: 4.3,
          importance: 5,
          address: {
            city: 'Barcelona',
            province: 'Barcelona',
            country: 'Spain',
            street: 'Carrer de Mallorca 401',
          },
          coordinates: [41.4036299, 2.1743558],
          imageUrl:
            'https://lh3.googleusercontent.com/p/AF1QipP3QmBuE3KmQBWw3DnRhUnvky-IJ53m6FvNwdbB=s680-w680-h510',
        });
        setArrowDown(false);
        position.value = withTiming(SHEET_OPEN_HEIGHT, {duration: 300});
      }
    }
  }, [placeId, position]);

  return showPlaceDetailExtended ? (
    <MapPlaceDetailExtended
      placeId={placeId}
      setMarkerSelected={setMarkerSelected}
      setTabBarVisible={setTabBarVisible}
      setShowPlaceDetailExtended={setShowPlaceDetailExtended}
    />
  ) : (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0.7}}
          colors={['#0004', '#0000']}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: '7%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowPlaceDetailExtended(true);
              setTabBarVisible(false);
            }}>
            <View
              style={{
                width: '100%',
                height: '20%',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                paddingTop: 8,
              }}>
              <Image
                source={place_pre_detail_arrow_top}
                style={{
                  height: 30,
                  width: 30,
                  transform: [{rotate: arrowDown ? '180deg' : '0deg'}],
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              width: '100%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingBottom: '6%',
              paddingTop: 10,
            }}>
            <View
              style={{
                flex: 2.5,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                paddingHorizontal: 12,
              }}>
              <Image
                source={{
                  uri: placeInformation?.imageUrl,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                flex: 4,
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#032000'}}>
                {placeInformation?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#032000',
                }}>{`${placeInformation?.address.city}, ${placeInformation?.address.country}`}</Text>

              <ShowRatingStar rating={placeInformation?.rating || 0} />
            </View>
            <View style={{flex: 1, marginHorizontal: '6%'}}>
              <Image
                source={importanceIcon()}
                resizeMode="contain"
                style={{width: '90%', height: '90%'}}
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
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});
