import {t} from 'i18next';
import React, {Dispatch, SetStateAction} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import place_detail_arrow_bottom_white from '../../../assets/images/icons/place_detail_arrow_bottom_white.png';
import IMedia from '../../../shared/interfaces/IMedia';
import IPlace from '../../../shared/interfaces/IPlace';
import ShowRatingStars from '../ShowRatingStars';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import PlaceMediaPill from './PlaceMediaPill';

const BORDER_RADIUS = 24;

interface MapPlaceDetailExpandedProps {
  placeMedia: IMedia[];
  importanceIcon: ImageSourcePropType;
  place: IPlace;
  setMedia: Dispatch<SetStateAction<IMedia | null>>;
  setPlace: Dispatch<SetStateAction<IPlace | null>>;
}

export default function MapPlaceDetailExpanded({
  placeMedia,
  importanceIcon,
  place,
  setMedia,
  setPlace,
}: MapPlaceDetailExpandedProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: Array.isArray(place.imagesUrl)
              ? `${place.imagesUrl[0]}?auto=compress&cs=tinysrgb&dpr=2&h=500&w=500}`
              : '',
          }}
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
            <Text style={styles.placeName}>{place?.name}</Text>
            <Text
              style={
                styles.placeAddress
              }>{`${place?.address.city}, ${place?.address.country}`}</Text>
            <ShowRatingStars rating={place?.rating || 0} />
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
          <Text style={styles.descriptionText}>{place?.description}</Text>
        </View>
      </View>
      <View style={styles.placeMediaContainer}>
        <View style={styles.placeMediaIntroContainer}>
          <Text style={styles.placeMediaIntroText}>
            {t('placeDetailExpanded.mediaIntro')}
          </Text>
        </View>
        <ScrollView
          scrollEventThrottle={16}
          style={{width: '100%', marginBottom: useSafeAreaInsets().bottom + 30}}
          showsVerticalScrollIndicator={false}>
          {placeMedia?.map((media, i) => (
            <PlaceMediaPill
              key={i}
              media={media}
              place={place}
              setMedia={setMedia}
              setPlace={setPlace}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  placeName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#032000',
    fontFamily: 'Montserrat-SemiBold',
  },
  placeAddress: {
    fontSize: 14,
    color: '#032000',
    fontFamily: 'Montserrat',
    paddingVertical: 5,
  },
  importanceIcon: {width: 40, height: 40},
  descriptionContainer: {paddingBottom: 20},
  descriptionText: {
    color: '#032000',
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: 'Montserrat',
  },
  placeMediaContainer: {
    flex: 1,
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
    fontSize: 12,
    fontFamily: 'Montserrat-SemiBold',
  },
});
