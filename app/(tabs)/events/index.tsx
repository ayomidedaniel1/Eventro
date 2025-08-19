import EventCardWrapper from '@/components/EventCardWrapper';
import EventListComponent from '@/components/EventListComponent';
import FilterRowComponent from '@/components/FilterRowComponent';
import HeaderComponent from '@/components/HeaderComponent';
import MostRatedEvents from '@/components/MostRatedEvents';
import SearchBarComponent from '@/components/SearchBarComponent';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { useRouter } from 'expo-router';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function HomeScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
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
                <EventCardWrapper item={item} router={router} />
              )}
              keyExtractor={(item: EventInsert, index: number) =>
                item.id || index.toString()
              }
              isLoading={isLoading}
            />
          ) : (
            <>
              <UpcomingEvents events={events ?? []} isLoading={isLoading} />
              <MostRatedEvents events={events ?? []} isLoading={isLoading} />
            </>
          )}
        </ScrollView>

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
});