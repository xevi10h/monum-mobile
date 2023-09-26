import Sound from 'react-native-sound';

export default interface IMedia {
  id: string;
  duration?: number;
  title: string;
  rating: number;
  audio?: Sound;
}
