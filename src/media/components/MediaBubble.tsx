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
import media_bubble_pause from '../../assets/images/icons/media_bubble_pause.png';
import media_bubble_play from '../../assets/images/icons/media_bubble_play.png';

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
import IPlace from '../../shared/interfaces/IPlace';
import {Slider} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  closePlayer,
  skipToNext,
  skipToPrev,
  togglePlaying,
} from '../../redux/states/medias';
import TrackPlayer, {State} from 'react-native-track-player';
import {set} from 'immer/dist/internal';

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;
const width = Dimensions.get('window').width;

type GestureContext = {
  startY: number;
  startX: number;
};

interface MediaBubbleProps {
  place: IPlace;
  setExpandedDetail: Dispatch<SetStateAction<boolean>>;
  trackPosition: number;
  trackDuration: number;
  setTrackPosition: Dispatch<SetStateAction<number>>;
}

export default function MediaBubble({
  place,
  setExpandedDetail,
  trackPosition,
  trackDuration,
  setTrackPosition,
}: MediaBubbleProps) {
  const [closeBubble, setCloseBubble] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {currentMedia, mediaList} = useSelector(
    (state: RootState) => state.medias,
  );
  const {statePlayer} = useSelector((state: RootState) => state.medias);
  const position = useSharedValue(width / 2);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureContext
  >({
    onStart: (_, context) => {
      context.startX = position.value;
    },
    onActive: (event, context) => {
      const newPosition = context.startX + event.translationX;
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

  useEffect(() => {
    if (closeBubble) {
      dispatch(closePlayer());
      setCloseBubble(true);
    }
  }, [closeBubble]);

  return (
    typeof currentMedia === 'number' && (
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
                  source={{
                    uri: Array.isArray(place.imagesUrl)
                      ? place.imagesUrl[0]
                      : '',
                  }}
                  style={styles.mediaBubbleImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.mediaBubbleInfoContainer}>
                <View style={styles.mediaBubbleTitleContainer}>
                  <Text style={styles.mediaBubbleTitleText}>
                    {mediaList[currentMedia].title}
                  </Text>
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
                  style={styles.mediaBubblePlayerButtonsImageContainer}
                  onPress={() => {
                    dispatch(skipToPrev());
                    setTrackPosition(0);
                  }}>
                  <Image
                    source={media_bubble_back}
                    style={styles.mediaBubblePlayerButtonsImage}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mediaBubblePlayerButtonsImageContainer}
                  onPress={() => dispatch(togglePlaying())}>
                  <Image
                    source={
                      statePlayer === State.Paused
                        ? media_bubble_play
                        : media_bubble_pause
                    }
                    style={styles.mediaBubblePlayerButtonsImagePlay}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mediaBubblePlayerButtonsImageContainer}
                  onPress={() => {
                    dispatch(skipToNext());
                    setTrackPosition(0);
                  }}>
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
                  onSlidingComplete={value => {
                    TrackPlayer.seekTo(value * trackDuration);
                    setTrackPosition(value * trackDuration);
                  }}
                  value={
                    trackDuration === 0 ? 0 : trackPosition / trackDuration
                  }
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
    )
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
