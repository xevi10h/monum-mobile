import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
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

import place_pre_detail_importance_1 from '../../assets/images/icons/placeImportance/place_pre_detail_importance_1.png';
interface MapPlaceDetailExtendedProps {
  placeId: string | null;
  setMarkerSelected: (...args: any[]) => unknown;
  setTabBarVisible: (...args: any[]) => unknown;
  setShowPlaceDetailExtended: (...args: any[]) => unknown;
}

type GestureContext = {
  startY: number;
};

export default function MapPlaceDetailExtended({
  placeId,
  setMarkerSelected,
  setTabBarVisible,
  setShowPlaceDetailExtended,
}: MapPlaceDetailExtendedProps) {
  const position = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startY = position.value;
    },
    onActive: (event, context) => {},
    onEnd: event => {},
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      bottom: position.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
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
                source={place_pre_detail_importance_1}
                style={{
                  height: 30,
                  width: 30,
                  transform: [{rotate: '0deg'}],
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
                  uri: 'k',
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
                {'jj'}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#032000',
                }}>{`${'jjjj'}, ${'kkk'}`}</Text>
            </View>
            <View style={{flex: 1, marginHorizontal: '6%'}}>
              <Image
                source={place_pre_detail_importance_1}
                resizeMode="contain"
                style={{width: '90%', height: '90%'}}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 400,
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
