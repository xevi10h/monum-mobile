import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IRoute from '../../shared/interfaces/IRoute';
import {Image} from 'react-native';
import place_detail_media_rating_star from '../../assets/images/icons/place_detail_media_rating_star.png';
import place_detail_play_media from '../../assets/images/icons/place_detail_play_media.png';
import IRouteOfCity from 'src/shared/interfaces/IRouteOfCity';
import {t} from 'i18next';

interface ListRoutePillProps {
  route: IRouteOfCity;
  onPress?: () => void;
}

export default function ListRoutePill({route, onPress}: ListRoutePillProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.placeMediaPillContainer}>
        <View style={styles.placeMediaPill}>
          <Text style={styles.placeMediaPillTitle}>{route.title}</Text>
          <Text style={styles.placeMediaPillDuration}>
            {`${route.stopsCount} ${t('stops')}`}
          </Text>
        </View>
        <View style={styles.mediaPillRatingContainer}>
          <Text style={styles.mediaPillRatingText}>
            {`${route?.rating?.toFixed(1) || '0'} `}
          </Text>
          <View>
            <Image
              source={place_detail_media_rating_star}
              style={styles.mediaPillRatingImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  placeMediaPillContainer: {
    width: '100%',
    height: 70,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  },
  placeMediaPillTitle: {
    fontSize: 14,
    color: '#032000',
    fontFamily: 'Montserrat',
  },
  placeMediaPillDuration: {
    fontSize: 10,
    color: '#032000',
    fontFamily: 'Montserrat',
  },
  placeMediaPillPlayIcon: {width: 24, height: 24},
  mediaPillRatingContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    height: 20,
    width: 30,
    backgroundColor: '#3F713B',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  mediaPillRatingText: {
    fontSize: 8,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  mediaPillRatingImage: {width: 8, height: 8},
});
