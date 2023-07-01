import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  SafeAreaView,
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

import place_detail_arrow_bottom_white from '../../assets/images/icons/place_detail_arrow_bottom_white.png';
import place_detail_play_media from '../../assets/images/icons/place_detail_play_media.png';
import {IPlace} from '../domain/IPlace';
import {IPlaceMedia} from '../domain/IPlaceMedia';
import {getPlaceMedia} from '../services/FakeData';

import ShowRatingStars from './ShowRatingStars';
const {height} = Dimensions.get('window');
interface MapPlaceDetailExtendedProps {
  importanceIcon: ImageSourcePropType;
  placeInformation: IPlace;
  setMarkerSelected: (...args: any[]) => unknown;
  setTabBarVisible: (...args: any[]) => unknown;
  setShowPlaceDetailExtended: (...args: any[]) => unknown;
}

type GestureContext = {
  startY: number;
};

export default function MapPlaceDetailExtended({
  importanceIcon,
  placeInformation,
  setMarkerSelected,
  setTabBarVisible,
  setShowPlaceDetailExtended,
}: MapPlaceDetailExtendedProps) {
  const [placeMedia, setPlaceMedia] = useState<IPlaceMedia[]>();
  const position = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startY = position.value;
    },
    onActive: (event, context) => {
      const newPosition = context.startY + event.translationY;
      if (newPosition < 0) {
        position.value = 0;
      } else {
        position.value = newPosition;
      }
    },
    onEnd: event => {
      if (position.value > height / 2 || event.velocityY > 0) {
        position.value = withTiming(height);
      } else {
        position.value = withTiming(0);
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    if (position.value >= height) {
      runOnJS(setMarkerSelected)(null);
    }
    return {
      marginTop: position.value + 50,
    };
  });

  useEffect(() => {
    if (placeInformation) {
      // TO DO: Change it for a call to the API
      const placeMedia = {};
      if (placeInformation) {
        setPlaceMedia(getPlaceMedia());
        position.value = withTiming(0, {duration: 300});
      }
    }
  }, [placeInformation, position]);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        top: 0,
      }}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[animatedStyle]}>
          <View
            style={{
              height: 200,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: placeInformation.imageUrl}}
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            />
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              setShowPlaceDetailExtended(true);
              setTabBarVisible(false);
            }}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['rgba(3, 32, 0, 1)', 'rgba(3, 32, 0, 0)']}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
              />
              <Image
                source={place_detail_arrow_bottom_white}
                style={{
                  height: 30,
                  width: 30,
                }}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              height: 100,
              backgroundColor: 'white',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <View>
              <Text
                style={{fontWeight: 'bold', fontSize: 16, color: '#032000'}}>
                {placeInformation?.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#032000',
                }}>{`${placeInformation?.address.city}, ${placeInformation?.address.country}`}</Text>
              <ShowRatingStars rating={placeInformation?.rating || 0} />
            </View>
            <View>
              <Image
                source={importanceIcon}
                style={{width: 40, height: 40}}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {placeMedia?.map((media, i) => (
              <View
                key={i}
                style={{
                  width: '95%',
                  height: 60,
                  borderRadius: 12,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.3,
                  shadowRadius: 1,
                  elevation: 2,
                  backgroundColor: 'white',
                  marginVertical: 10,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'baseline',
                  }}>
                  <Text
                    style={{fontWeight: 'bold', fontSize: 20, marginRight: 10}}>
                    {media.id}
                  </Text>
                  <Text style={{fontSize: 17}}>{media.title}</Text>
                </View>
                <View>
                  <Image
                    source={place_detail_play_media}
                    style={{width: 24, height: 24}}
                    resizeMode="contain"
                  />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({});
