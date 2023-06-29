import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.2}}
          colors={['#0004', '#0000']}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: 20,
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'blue',
              width: 100,
              height: 100,
            }}></View>
          <TouchableOpacity
            onPress={() => {
              setShowPlaceDetailExtended(false);
              setTabBarVisible(true);
              setMarkerSelected(null);
            }}
            style={{
              flex: 1,
              backgroundColor: 'red',
              height: 50,
              width: 20,
            }}
          />
        </LinearGradient>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 1000,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    bottom: 0,
  },
});
