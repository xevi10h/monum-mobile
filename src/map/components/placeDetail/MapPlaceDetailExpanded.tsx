import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import place_detail_arrow_bottom_white from '../../../assets/images/icons/place_detail_arrow_bottom_white.png';
import place_detail_play_media from '../../../assets/images/icons/place_detail_play_media.png';
import {IPlace} from '../../domain/IPlace';
import {IPlaceMedia} from '../../domain/IPlaceMedia';
import ShowRatingStars from '../ShowRatingStars';

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
      <View style={styles.placeMediaContainer}>
        {placeMedia?.map((media, i) => (
          <View key={i} style={styles.placeMediaPill}>
            <View style={styles.placeMediaPillTextContainer}>
              <Text style={styles.placeMediaPillId}>{media.id}</Text>
              <Text style={styles.placeMediaPillTitle}>{media.title}</Text>
            </View>
            <View>
              <Image
                source={place_detail_play_media}
                style={styles.placeMediaPillPlayIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        ))}
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
  infoContainer: {
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  placeName: {fontWeight: 'bold', fontSize: 16, color: '#032000'},
  placeAddress: {
    fontSize: 16,
    color: '#032000',
  },
  importanceIcon: {width: 40, height: 40},
  placeMediaContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeMediaPill: {
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
  },
  placeMediaPillTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  placeMediaPillId: {fontWeight: 'bold', fontSize: 20, marginRight: 10},
  placeMediaPillTitle: {fontSize: 17},
  placeMediaPillPlayIcon: {width: 24, height: 24},
});
