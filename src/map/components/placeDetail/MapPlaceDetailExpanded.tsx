import {t} from 'i18next';
import React, {RefObject, useRef, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ScrollView,
  NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import place_detail_arrow_bottom_white from '../../../assets/images/icons/place_detail_arrow_bottom_white.png';
import place_detail_media_rating_star from '../../../assets/images/icons/place_detail_media_rating_star.png';
import place_detail_play_media from '../../../assets/images/icons/place_detail_play_media.png';
import {IPlace} from '../../domain/IPlace';
import {IPlaceMedia} from '../../domain/IPlaceMedia';
import ShowRatingStars from '../ShowRatingStars';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BORDER_RADIUS = 24;

interface MapPlaceDetailExpandedProps {
  placeMedia: IPlaceMedia[] | undefined;
  importanceIcon: ImageSourcePropType;
  placeReducedInfo: IPlace;
}

export default function MapPlaceDetailExpanded({
  placeMedia,
  importanceIcon,
  placeReducedInfo,
}: MapPlaceDetailExpandedProps) {
  const scrollRef = useRef<ScrollView>(null);
  const handleScroll = ({contentOffset}: NativeScrollEvent) => {
    console.log(contentOffset);
    // scrollRef.current?.forceUpdate();
  };
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: placeReducedInfo.imageUrl}}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.arrowContainer}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(3, 32, 0, 1)', 'rgba(3, 32, 0, 0)']}
          style={styles.linearGradient}
        />
        <Image
          source={place_detail_arrow_bottom_white}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.basicInfoConatiner}>
          <View>
            <Text style={styles.placeName}>{placeReducedInfo?.name}</Text>
            <Text
              style={
                styles.placeAddress
              }>{`${placeReducedInfo?.address.city}, ${placeReducedInfo?.address.country}`}</Text>
            <ShowRatingStars rating={placeReducedInfo?.rating || 0} />
          </View>
          <View>
            <Image
              source={importanceIcon}
              style={styles.importanceIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {placeReducedInfo?.description}
          </Text>
        </View>
      </View>
      <View style={styles.placeMediaContainer}>
        <View style={styles.placeMediaIntroContainer}>
          <Text style={styles.placeMediaIntroText}>
            {t('placeDetailExpanded.mediaIntro')}
          </Text>
        </View>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={16}
          style={{width: '100%'}}
          onScroll={event => handleScroll(event.nativeEvent)}>
          {placeMedia?.map((media, i) => (
            <TouchableOpacity key={i}>
              <View style={styles.placeMediaPillContainer}>
                <View style={styles.placeMediaPill}>
                  <View>
                    <Text style={styles.placeMediaPillTitle}>
                      {media.title}
                    </Text>
                    <Text style={styles.placeMediaPillDuration}>
                      {`${(media.duration / 60).toFixed(0)} min`}
                    </Text>
                  </View>
                  <View>
                    <Image
                      source={place_detail_play_media}
                      style={styles.placeMediaPillPlayIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 10,
                    height: 20,
                    width: 35,
                    backgroundColor: '#3F713B',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.placeMediaPillRating}>
                    {`${media.rating.toFixed(1)}`}
                  </Text>
                  <View>
                    <Image
                      source={place_detail_media_rating_star}
                      style={{width: 8, height: 8}}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    backgroundColor: 'white',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  imageContainer: {
    height: 200,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  arrowContainer: {
    position: 'absolute',
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
  },
  arrowIcon: {
    height: 30,
    width: 30,
  },
  infoContainer: {backgroundColor: 'white', paddingHorizontal: 15},
  basicInfoConatiner: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeName: {fontWeight: '600', fontSize: 16, color: '#032000'},
  placeAddress: {
    fontSize: 16,
    color: '#032000',
  },
  importanceIcon: {width: 40, height: 40},
  descriptionContainer: {paddingBottom: 20},
  descriptionText: {color: '#032000', textAlign: 'justify'},
  placeMediaContainer: {
    width: '100%',
    backgroundColor: '#ECF3EC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  placeMediaIntroContainer: {
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  placeMediaIntroText: {
    fontWeight: '600',
    color: '#3F713B',
    fontSize: 14,
  },
  placeMediaPillContainer: {
    width: '100%',
    height: 70,
    shadowColor: '#C0DCBE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 6,
  },
  placeMediaPill: {
    height: 50,
    borderRadius: 12,
    backgroundColor: 'white',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 10,
  },
  placeMediaPillTitle: {fontSize: 14, color: '#3F713B'},
  placeMediaPillDuration: {fontSize: 12, color: '#3F713B'},
  placeMediaPillPlayIcon: {width: 24, height: 24},
  placeMediaPillRating: {
    fontSize: 10,
    color: 'white',
  },
});
