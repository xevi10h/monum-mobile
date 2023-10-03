import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import media_bubble_pause from '../../assets/images/icons/media_bubble_pause.png';
import media_bubble_play from '../../assets/images/icons/media_bubble_play.png';
import MediaExpanded from './MediaExpanded';
import MediaBubble from './MediaBubble';
import IPlace from '../../shared/interfaces/IPlace';
import IMedia from '../../shared/interfaces/IMedia';
import TrackPlayer, {RepeatMode, State} from 'react-native-track-player';
import {addTracks, setupPlayer} from '../../track-player/service';

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

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();
      console.log('isSetup', isSetup);

      const queue = await TrackPlayer.getQueue();
      console.log('queue', queue);
      if (isSetup && queue.length <= 0) {
        await TrackPlayer.add([
          {
            id: media.id,
            url: media.audioUrl,
            title: media.title,
            artist: 'Xplorear',
          },
        ]);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        const queue2 = await TrackPlayer.getQueue();
        console.log('queue2', queue2);
        TrackPlayer.play();
      }
      setIsPlayerReady(isSetup);
    }
    setup();
  }, []);

  const togglePlaying = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.add([
        {
          id: media.id,
          url: media.audioUrl,
          title: media.title,
          artist: 'Xplorear',
        },
      ]);
      await TrackPlayer.play();
      setPlayIcon(media_bubble_pause);
    } else {
      if ((await TrackPlayer.getState()) === State.Paused) {
        await TrackPlayer.play();
        setPlayIcon(media_bubble_pause);
      } else {
        await TrackPlayer.pause();
        setPlayIcon(media_bubble_play);
      }
    }
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
      // seek={seek}
      togglePlaying={togglePlaying}
    />
  );
}
