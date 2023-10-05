import {Dispatch, SetStateAction, useEffect, useState} from 'react';

import MediaExpanded from './MediaExpanded';
import MediaBubble from './MediaBubble';
import IPlace from '../../shared/interfaces/IPlace';
import TrackPlayer from 'react-native-track-player';

interface MediaBubbleProps {
  place: IPlace;
}

export default function MediaComponent({place}: MediaBubbleProps) {
  const [expandedDetail, setExpandedDetail] = useState(false);

  const [trackPosition, setTrackPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(1);

  useEffect(() => {
    const getTrackInfo = async () => {
      try {
        const position = await TrackPlayer.getPosition();
        const duration = await TrackPlayer.getDuration();
        setTrackPosition(position);
        setTrackDuration(duration);
      } catch (error) {
        console.error('Error fetching track info:', error);
      }
    };
    const intervalId = setInterval(() => {
      getTrackInfo();
    }, 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return expandedDetail ? (
    <MediaExpanded
      place={place}
      setExpandedDetail={setExpandedDetail}
      trackPosition={trackPosition}
      trackDuration={trackDuration}
      setTrackPosition={setTrackPosition}
    />
  ) : (
    <MediaBubble
      place={place}
      setExpandedDetail={setExpandedDetail}
      trackPosition={trackPosition}
      trackDuration={trackDuration}
      setTrackPosition={setTrackPosition}
    />
  );
}
