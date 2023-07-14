import {Dispatch, SetStateAction, useState} from 'react';

import media_bubble_pause from '../../assets/images/icons/media_bubble_pause.png';
import media_bubble_play from '../../assets/images/icons/media_bubble_play.png';
import MediaExpanded from './MediaExpanded';
import MediaBubble from './MediaBubble';
import IPlace from 'src/map/domain/IPlace';
import IMedia from 'src/map/domain/IMedia';

interface MediaBubbleProps {
  place: IPlace;
  setPlace: Dispatch<SetStateAction<IPlace | null>>;
  media: IMedia;
  setMedia: Dispatch<SetStateAction<IMedia | null>>;
}

export default function MediaComponent({
  place,
  setPlace,
  media,
  setMedia,
}: MediaBubbleProps) {
  const [totalLength, setTotalLength] = useState(1);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [playIcon, setPlayIcon] = useState(media_bubble_pause);
  const [expandedDetail, setExpandedDetail] = useState(false);

  // useEffect(() => {
  //   const sound = new Sound('audio_prueba.mp3', Sound.MAIN_BUNDLE, error => {
  //     if (error) {
  //       console.log('Error loading sound: ', error);
  //     } else {
  //       sound.play(success => {
  //         if (success) {
  //           console.log('Audio has finished playing');
  //         } else {
  //           console.log('Audio playback failed');
  //         }
  //       });
  //     }
  //   });
  //   setMedia({...media, audio: sound});
  // }, []);

  const togglePlaying = () => {
    if (media.audio?.isPlaying()) {
      media.audio?.pause();
      setPlayIcon(media_bubble_play);
    } else {
      media.audio?.play();
      setPlayIcon(media_bubble_pause);
    }
  };

  const play = () => {
    media.audio?.getCurrentTime(seconds => setCurrentPosition(seconds));
  };

  const seek = (time: number) => {
    time = Math.round(time);
    media.audio?.setCurrentTime(time);
    setCurrentPosition(time);
    play();
  };

  return expandedDetail ? (
    <MediaExpanded
      place={place}
      media={media}
      setExpandedDetail={setExpandedDetail}
    />
  ) : (
    <MediaBubble
      place={place}
      media={media}
      setMedia={setMedia}
      totalLength={totalLength}
      setTotalLength={setTotalLength}
      currentPosition={currentPosition}
      setCurrentPosition={setCurrentPosition}
      setExpandedDetail={setExpandedDetail}
      playIcon={playIcon}
      seek={seek}
      togglePlaying={togglePlaying}
    />
  );
}
