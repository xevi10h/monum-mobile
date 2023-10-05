import {State} from 'react-native-track-player';
import IMedia from './IMedia';

export default interface IMedias {
  statePlayer: State;
  setupPlayer: boolean;
  currentMedia: number | null;
  mediaList: IMedia[];
}
