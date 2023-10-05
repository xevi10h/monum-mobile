import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IMedia from '../../../shared/interfaces/IMedia';
import IPlace from '../../../shared/interfaces/IPlace';
import {Image} from 'react-native';
import place_detail_media_rating_star from '../../../assets/images/icons/place_detail_media_rating_star.png';
import place_detail_play_media from '../../../assets/images/icons/place_detail_play_media.png';
import {useDispatch} from 'react-redux';
import {setNewCurrentMedia} from '../../../redux/states/medias';
import {AppDispatch} from '../../../redux/store';

interface PlaceMediaPillProps {
  media: IMedia;
  place: IPlace;
  placeMedia: IMedia[];
  setPlace: (place: IPlace) => void;
}

export default function PlaceMediaPill({
  media,
  place,
  placeMedia,
  setPlace,
}: PlaceMediaPillProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <TouchableOpacity
      onPress={() => {
        setPlace(place);
        dispatch(
          setNewCurrentMedia({
            medias: placeMedia,
            position: placeMedia.indexOf(media),
          }),
        );
      }}>
      <View style={styles.placeMediaPillContainer}>
        <View style={styles.placeMediaPill}>
          <View>
            <Text style={styles.placeMediaPillTitle}>{media.title}</Text>
            <Text style={styles.placeMediaPillDuration}>
              {`${(media.duration ? media.duration / 60 : 0).toFixed(0)} min`}
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
        <View style={styles.mediaPillRatingContainer}>
          <Text style={styles.mediaPillRatingText}>
            {`${media.rating.toFixed(1)}`}
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
    shadowColor: '#C0DCBE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
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
    paddingBottom: 5,
    paddingTop: 10,
  },
  placeMediaPillTitle: {
    fontSize: 12,
    color: '#3F713B',
    fontFamily: 'Montserrat',
  },
  placeMediaPillDuration: {
    fontSize: 10,
    color: '#3F713B',
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
