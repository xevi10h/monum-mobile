import {MarkerView} from '@rnmapbox/maps';
import {useState} from 'react';
import {useEffect} from 'react';
import {Image, View, TouchableOpacity, Button, Alert} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

import map_marker_importance_1 from '../../assets/images/icons/map_marker_importance_1.png';
import map_marker_importance_2 from '../../assets/images/icons/map_marker_importance_2.png';
import map_marker_importance_3 from '../../assets/images/icons/map_marker_importance_3.png';
import map_marker_importance_4 from '../../assets/images/icons/map_marker_importance_4.png';
import map_marker_importance_5 from '../../assets/images/icons/map_marker_importance_5.png';
import map_marker_importance_selected from '../../assets/images/icons/map_marker_importance_selected.png';
import {styles} from '../styles/MapStyles';

export interface MarkerProps {
  id: string;
  coordinates: [number, number];
  importance: number;
  selected?: boolean;
  setMarkerSelected?: (...args: any[]) => unknown;
}

export function MarkerComponent({
  id,
  coordinates,
  importance,
  selected,
  setMarkerSelected,
}: MarkerProps) {
  const [icon, setIcon] = useState(map_marker_importance_1);
  const [dimensions, setDimensions] = useState(30);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const chooseIcon = () => {
    setBackgroundColor(selected ? '#3F713B' : 'white');
    switch (importance) {
      case 1:
        setIcon(
          selected ? map_marker_importance_selected : map_marker_importance_1,
        );
        setDimensions(30);
        break;
      case 2:
        setIcon(
          selected ? map_marker_importance_selected : map_marker_importance_2,
        );
        setDimensions(32);
        break;
      case 3:
        setIcon(
          selected ? map_marker_importance_selected : map_marker_importance_3,
        );
        setDimensions(36);
        break;
      case 4:
        setIcon(
          selected ? map_marker_importance_selected : map_marker_importance_4,
        );
        setDimensions(42);
        break;
      case 5:
        setIcon(
          selected ? map_marker_importance_selected : map_marker_importance_5,
        );
        setDimensions(46);
        break;
    }
  };

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      if (setMarkerSelected) runOnJS(setMarkerSelected)(id);
    });

  useEffect(() => {
    chooseIcon();
  }, [selected]);

  return (
    <MarkerView
      id={id}
      key={id}
      coordinate={coordinates}
      style={{
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 10,
      }}>
      <GestureDetector gesture={Gesture.Exclusive(singleTap)}>
        <View
          style={{
            backgroundColor: backgroundColor,
            width: dimensions,
            height: dimensions,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 30,
          }}>
          <Image
            source={icon}
            style={{width: '65%', height: '65%'}}
            resizeMode={'contain'}
          />
        </View>
      </GestureDetector>
    </MarkerView>
  );
}
