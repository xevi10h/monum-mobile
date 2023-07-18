import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import media_bubble_location from '../../assets/images/icons/media_bubble_location.png';
import media_bubble_back from '../../assets/images/icons/media_bubble_back.png';
import media_bubble_forward from '../../assets/images/icons/media_bubble_forward.png';

import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import IPlace from 'src/map/domain/IPlace';
import IMedia from 'src/map/domain/IMedia';
import {Slider} from '@rneui/themed';

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;
const width = Dimensions.get('window').width;

type GestureContext = {
  startY: number;
  startX: number;
};

interface MediaBubbleProps {
  place: IPlace;
  media: IMedia;
  setMedia: Dispatch<SetStateAction<IMedia | null>>;
  totalLength: number;
  setTotalLength: Dispatch<SetStateAction<number>>;
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  setExpandedDetail: Dispatch<SetStateAction<boolean>>;
  playIcon: number;
  seek: (value: number) => void;
  togglePlaying: () => void;
}

export default function MediaBubble({
  place,
  media,
  setMedia,
  totalLength,
  setTotalLength,
  currentPosition,
  setCurrentPosition,
  setExpandedDetail,
  playIcon,
  seek,
  togglePlaying,
}: MediaBubbleProps) {
  const position = useSharedValue(width / 2);
  const [closeBubble, setCloseBubble] = useState(false);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startX = position.value;
    },
    onActive: (event, context) => {
      const newPosition = context.startX + event.translationX;
      // console.log(newPosition);
      position.value = newPosition;
    },
    onEnd: event => {
      const diference = position.value - width / 2;
      if (diference > 15 && event.velocityX > 0) {
        position.value = withTiming(width, {duration: 100});
        runOnJS(setCloseBubble)(true);
      } else if (-diference > 15 && event.velocityX < 0) {
        position.value = withTiming(0, {duration: 100});
        runOnJS(setCloseBubble)(true);
      } else {
        position.value = withTiming(width / 2);
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    const diference = position.value - width / 2;
    if (
      (position.value === width || position.value === 0) &&
      closeBubble === true
    ) {
      runOnJS(setMedia)(null);
      runOnJS(setCloseBubble)(false);
    }
    return {
      left: 15 + diference,
      right: 15 - diference,
    };
  });

  useEffect(() => {
    position.value = withTiming(width / 2, {
      duration: 300,
    });
  }, []);
  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          styles.animatedContainer,
          animatedStyle,
          {
            bottom:
              useSafeAreaInsets().bottom + BOTTOM_TAB_NAVIGATOR_HEIGHT + 20,
          },
        ]}>
        <TouchableWithoutFeedback onPress={() => setExpandedDetail(true)}>
          <View style={styles.mediaBubbleContainer}>
            <View style={styles.mediaBubbleImageContainer}>
              <Image
                source={{uri: place.imageUrl}}
                style={styles.mediaBubbleImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaBubbleInfoContainer}>
              <View style={styles.mediaBubbleTitleContainer}>
                <Text style={styles.mediaBubbleTitleText}>{media.title}</Text>
              </View>
              <View style={styles.mediaBubbleLocationContainer}>
                <Image
                  source={media_bubble_location}
                  style={styles.mediaBubbleLocationImage}
                  resizeMode="contain"
                />
                <Text style={styles.mediaBubbleLocationText}>
                  {place?.address?.city}
                </Text>
              </View>
            </View>
            <View style={styles.mediaBubblePlayerButtonsContainer}>
              <TouchableOpacity
                style={styles.mediaBubblePlayerButtonsImageContainer}>
                <Image
                  source={media_bubble_back}
                  style={styles.mediaBubblePlayerButtonsImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mediaBubblePlayerButtonsImageContainer}
                onPress={() => togglePlaying()}>
                <Image
                  source={playIcon}
                  style={styles.mediaBubblePlayerButtonsImagePlay}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mediaBubblePlayerButtonsImageContainer}>
                <Image
                  source={media_bubble_forward}
                  style={styles.mediaBubblePlayerButtonsImagePlay}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.mediaBubbleSliderContainer,
                {width: width * 0.65},
              ]}>
              <Slider
                maximumValue={1.2}
                onSlidingComplete={seek}
                value={1}
                style={{height: 1}}
                minimumValue={0}
                trackStyle={{height: 2}}
                thumbStyle={{height: 6, width: 6}}
                maximumTrackTintColor="grey"
                minimumTrackTintColor="#032000"
                thumbTintColor="#032000"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    borderRadius: 12,
    height: 70,
  },
  mediaBubbleContainer: {
    width: '100%',
    height: 70,
    borderRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#CCD8CB',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    padding: 10,
  },
  mediaBubbleImageContainer: {
    flex: 40,
    marginRight: 5,
  },
  mediaBubbleImage: {width: 40, height: 40, borderRadius: 12},
  mediaBubbleInfoContainer: {
    flex: 230,
    height: 17,
    marginHorizontal: 5,
  },
  mediaBubbleTitleContainer: {
    width: '100%',
    height: 17,
    marginBottom: 5,
  },
  mediaBubbleTitleText: {
    color: '#032000',
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  mediaBubbleLocationContainer: {
    width: '100%',
    height: 17,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  mediaBubbleLocationImage: {width: 15, height: 15, marginHorizontal: 3},
  mediaBubbleLocationText: {color: '#3F713B', fontSize: 14},
  mediaBubblePlayerButtonsContainer: {
    flexDirection: 'row',
    flex: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  mediaBubblePlayerButtonsImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaBubblePlayerButtonsImage: {width: 10, height: 14},
  mediaBubblePlayerButtonsImagePlay: {width: 14, height: 14},
  mediaBubbleSliderContainer: {
    position: 'absolute',
    bottom: 10,
    height: 1,
    left: 10,
  },
});
