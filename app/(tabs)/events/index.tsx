import EventCardWrapper from '@/components/EventCardWrapper';
import EventListComponent from '@/components/EventListComponent';
import EventInformation from '@/components/EventsInformation';
import FilterRowComponent from '@/components/FilterRowComponent';
import HeaderComponent from '@/components/HeaderComponent';
import MostRatedEvents from '@/components/MostRatedEvents';
import SearchBarComponent from '@/components/SearchBarComponent';
import UpcomingEvents from '@/components/UpcomingEvents';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import BottomSheet from '@gorhom/bottom-sheet';
import debounce from 'lodash/debounce';
import { JSX, useCallback, useMemo, useRef, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EventInsert | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '75%', '90%'], []);

  const { data: events, isLoading, error, refetch } = useEvents({
    keyword: searchTerm,
    genre: filterGenre,
  });
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch, filterGenre]
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedRefetch();
  };

  const handleFilterChange = () => {
    debouncedRefetch();
  };

  const handleEventPress = (event: EventInsert): void => {
    setSelectedEvent(event);
    bottomSheetRef.current?.expand();
  };

  const handleSheetChanges = useCallback((index: number): void => {
    if (index === -1) {
      setSelectedEvent(null);
    }
  }, []);

  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, }} contentContainerStyle={{ paddingBottom: 100, }}>
          <HeaderComponent title="Eventro." />

          <SearchBarComponent
            value={searchTerm}
            onChangeText={handleSearch}
            isLoading={isLoading}
            placeholder="Discover"
            placeholderTextColor="#7D7F82"
          />

          <FilterRowComponent
            filterGenre={filterGenre}
            setFilterGenre={(value) => {
              setFilterGenre(value);
              handleFilterChange();
            }}
          />

          {searchTerm.trim() ? (
            <EventListComponent
              data={isLoading ? Array(4).fill({}) : events || []}
              renderItem={(item: EventInsert) => (
                <EventCardWrapper item={item} onPress={handleEventPress} />
              )}
              keyExtractor={(item: EventInsert, index: number) =>
                item.id || index.toString()
              }
              isLoading={isLoading}
            />
          ) : (
            <>
              <UpcomingEvents events={events ?? []} isLoading={isLoading} onPress={handleEventPress} />
              <MostRatedEvents events={events ?? []} isLoading={isLoading} onPress={handleEventPress} />
            </>
          )}
        </ScrollView>

        {selectedEvent && (
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            style={styles.bottomSheet}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandle}
            onChange={handleSheetChanges}
          >
            <EventInformation event={selectedEvent} />
          </BottomSheet>
        )}

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    color: 'red',
    fontFamily: 'Manrope-Regular',
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomSheetBackground: {
    backgroundColor: '#1A1A1D',
  },
  bottomSheetHandle: {
    backgroundColor: '#FFFFFF',
  },
});