import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CityPillProps {
  cityName: string;
  onPress: (string: string) => void;
  imageUrl: string;
}

export default function CityPill({cityName, onPress, imageUrl}: CityPillProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(cityName)}>
      <Image
        source={{uri: `${imageUrl}?auto=compress&fit=crop&h=1200`}}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['rgba(3, 32, 0, 1)', 'rgba(3, 32, 0, 0)']}
        style={styles.linearGradient}
      />
      <Text style={styles.cityName}>{cityName}</Text>
    </TouchableOpacity>
  );
}

const BORDER_RADIUS = 12;

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 15,
    justifyContent: 'center',
  },
  image: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: BORDER_RADIUS,
  },
  cityName: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Montserrat',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: BORDER_RADIUS,
  },
});
