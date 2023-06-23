import {useEffect, useRef, useState} from 'react';
import {NativeScrollEvent, ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {styles} from '../styles/MapStyles';

import FilterLeftArrow from './FilterLeftArrow';
import FilterPill from './FilterPill';
import FilterRightArrow from './FilterRightArrow';

export default function FilterComponent() {
  const scrollRef = useRef<ScrollView>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [filters, setFilters] = useState<
    {id: number; label: string; active: boolean}[]
  >([]);

  useEffect(() => {
    //Fer una crida amb un GET de posibles filtres
    setFilters([
      {id: 1, label: 'Cultura', active: false},
      {id: 3, label: 'Entreteniment', active: false},
      {id: 4, label: 'Art', active: false},
      {id: 5, label: 'Historia', active: false},
      {id: 6, label: 'Natura', active: false},
      {id: 2, label: 'Restaurants', active: false},
    ]);
  }, []);

  const handlePillPress = (pillId: number) => {
    // Cambiar el estado de la pastilla y realizar la llamada al backend
    setFilters(filters =>
      filters.map(filter =>
        filter.id === pillId ? {...filter, active: !filter.active} : filter,
      ),
    );

    // Realizar la llamada al backend y cambiar los filtros del mapa
    // ...
  };

  const handleScroll = ({
    contentOffset,
    contentSize,
    layoutMeasurement,
  }: NativeScrollEvent) => {
    const scrollPercentage =
      contentOffset.x / (contentSize.width - layoutMeasurement.width);

    if (scrollPercentage > 0.9) {
      setShowLeftArrow(true);
    } else {
      setShowLeftArrow(false);
    }

    if (scrollPercentage < 0.1) {
      setShowRightArrow(true);
    } else {
      setShowRightArrow(false);
    }
  };

  const handlePressRight = () => {
    scrollRef.current?.scrollTo({x: 50, animated: true});
  };

  const handlePressLeft = () => {
    scrollRef.current?.scrollTo({x: -50, animated: true});
  };

  return (
    <SafeAreaView style={styles.filterContainer}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={event => handleScroll(event.nativeEvent)}>
        {filters.map(filter => (
          <FilterPill
            key={filter.id}
            label={filter.label}
            active={filter.active}
            onPress={() => handlePillPress(filter.id)}
          />
        ))}
      </ScrollView>
      {showRightArrow && <FilterRightArrow onPress={handlePressRight} />}
      {showLeftArrow && <FilterLeftArrow onPress={handlePressLeft} />}
    </SafeAreaView>
  );
}
