import EventCardWrapper from '@/components/EventCardWrapper';
import EventListComponent from '@/components/EventListComponent';
import FilterRowComponent from '@/components/FilterRowComponent';
import HeaderComponent from '@/components/HeaderComponent';
import MostRatedEvents from '@/components/MostRatedEvents';
import SearchBarComponent from '@/components/SearchBarComponent';
import UpcomingEvents from '@/components/UpcomingEvents';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import debounce from 'lodash/debounce';
import { JSX, useCallback, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRefinedSearchQuery } from '@/utils/geminiService';
import { supabase } from '@/utils/supabase';

export default function HomeScreen(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [queryToFetch, setQueryToFetch] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [isAISearching, setIsAISearching] = useState(false);

  const { data: events, isLoading, error, refetch } = useEvents({
    keyword: queryToFetch,
    genre: filterGenre,
  });
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  const debouncedAISearch = useCallback(
    debounce(async (text: string) => {
      if (!text.trim()) {
        setQueryToFetch('');
        return;
      }

      setIsAISearching(true);
      try {
        // call edge function to refine users input
        const refinedQuery = await getRefinedSearchQuery(supabase, text);
        setQueryToFetch(refinedQuery);
      } catch (error) {
        console.error('AI Search failed. Falling back to raw query', error);
        setQueryToFetch(text);
      } finally {
        setIsAISearching(false);
      }
    }, 500),
    []
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedAISearch(text);
  };

  const handleFilterChange = () => {
    if (searchTerm.trim()) {
      debouncedAISearch(searchTerm);
    } else {
      refetch();
    }
  };

  const handleEventPress = (event: EventInsert): void => {
    router.push(`/events/${event.id}/detail`);
  };

  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const overallLoading = isLoading || isAISearching;

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
            <>
              <View style={styles.resultContainer}>
                <Text style={styles.result}>
                  {isLoading ? 'Searching...' : `${events?.length || 0} results`}
                </Text>

                <View style={styles.filterContainer}>
                  <AntDesign name='swap' size={16} color={'#FFFFFF'} />
                </View>
              </View>
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
            </>
          ) : (
            <>
              <UpcomingEvents events={events ?? []} isLoading={isLoading} onPress={handleEventPress} />
              <MostRatedEvents events={events ?? []} isLoading={isLoading} onPress={handleEventPress} />
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
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 14,
  },
  result: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 26,
    color: '#FFFFFF',
  },
  filterContainer: {
    width: 54,
    height: 54,
    backgroundColor: '#1A1A1D',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: "90deg" }],
  },
});
