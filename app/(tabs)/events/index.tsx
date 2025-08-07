import EventCardWrapper from '@/components/EventCardWrapper';
import EventListComponent from '@/components/EventListComponent';
import FilterRowComponent from '@/components/FilterRowComponent';
import HeaderComponent from '@/components/HeaderComponent';
import SearchBarComponent from '@/components/SearchBarComponent';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { useRouter } from 'expo-router';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EventsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const { data: events, isLoading, error, refetch } = useEvents({
    keyword: searchTerm,
    startDateTime: filterDate,
    city: filterLocation,
    genre: filterGenre,
    status: filterStatus,
  });
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  const debouncedRefetch = useCallback(
    debounce(() => {
      refetch();
    }, 300),
    [refetch, filterDate, filterLocation, filterGenre, filterStatus]
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
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>

          <HeaderComponent title="Events" />

          <SearchBarComponent
            value={searchTerm}
            onChangeText={handleSearch}
            isLoading={isLoading}
            placeholder="Search events..."
            placeholderTextColor="#888"
          />

          <FilterRowComponent
            filterDate={filterDate}
            setFilterDate={(value) => {
              setFilterDate(value);
              handleFilterChange();
            }}
            filterLocation={filterLocation}
            setFilterLocation={(value) => {
              setFilterLocation(value);
              handleFilterChange();
            }}
            filterGenre={filterGenre}
            setFilterGenre={(value) => {
              setFilterGenre(value);
              handleFilterChange();
            }}
            filterStatus={filterStatus}
            setFilterStatus={(value) => {
              setFilterStatus(value);
              handleFilterChange();
            }}
          />

          <EventListComponent
            data={isLoading ? Array(4).fill({}) : events || []}
            renderItem={(item: EventInsert) => <EventCardWrapper item={item} router={router} />}
            keyExtractor={(item: EventInsert, index: number) => item.id || index.toString()}
            isLoading={isLoading}
          />

        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
});