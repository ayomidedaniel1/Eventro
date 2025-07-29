import EventCard from '@/components/EventCard';
import SkeletonEventCard from '@/components/SkeletonEventCard';
import { useEvents } from '@/hooks/useEvents';
import { useEventStore } from '@/store/eventStore';
import { EventInsert } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import debounce from 'lodash/debounce';
import { useCallback, useState } from 'react';
import { FlatList, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EventsScreen() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { data: events, isLoading, error, refetch } = useEvents({
    keyword: searchTerm,
    startDateTime: filterDate,
    city: filterLocation,
  });
  const setEvents = useEventStore((state) => state.setEvents);

  if (events && events.length > 0) {
    setEvents(events);
  }

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchTerm(text);
      refetch();
    }, 300),
    [refetch] // Added refetch to dependencies
  );

  const handleSearch = (text: string) => {
    debouncedSearch(text);
  };

  const openFilterModal = () => setModalVisible(true);
  const closeFilterModal = () => setModalVisible(false);

  const applyFilters = () => {
    refetch();
    closeFilterModal();
  };

  const clearFilters = () => {
    setFilterDate('');
    setFilterLocation('');
    refetch();
    closeFilterModal();
  };

  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  const renderEventCard = ({ item }: { item: EventInsert; }) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/events/[id]/detail', params: { id: item.id } })}
      activeOpacity={0.8}
    >
      <EventCard event={item} />
    </TouchableOpacity>
  );

  const EmptyComponent = () => (!isLoading && events?.length === 0 ? (
    <Text style={styles.empty}>No events available.</Text>
  ) : null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2ACE99', '#B8FAD6']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Upcoming Events</Text>
      </LinearGradient>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Search events..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Text style={styles.filterText}>Filter Events</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={isLoading ? Array(4).fill({}) : events || []}
        renderItem={({ item }) => (isLoading ? <SkeletonEventCard /> : renderEventCard({ item }))}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={EmptyComponent}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Events</Text>
            <Picker
              selectedValue={filterDate}
              onValueChange={(itemValue) => setFilterDate(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Any Date" value="" />
              <Picker.Item label="Today" value={new Date().toISOString().split('T')[0]} />
              <Picker.Item label="Tomorrow" value={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
              <Picker.Item label="This Week" value={new Date(Date.now() + 604800000).toISOString().split('T')[0]} />
            </Picker>
            <Picker
              selectedValue={filterLocation}
              onValueChange={(itemValue) => setFilterLocation(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Any Location" value="" />
              <Picker.Item label="Lagos" value="Lagos" />
              <Picker.Item label="Abuja" value="Abuja" />
              <Picker.Item label="Port Harcourt" value="Port Harcourt" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, styles.clearButton]} onPress={clearFilters}>
                <Text style={styles.modalButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.applyButton]} onPress={applyFilters}>
                <Text style={styles.modalButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FFF9',
  },
  header: {
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  list: {
    padding: 15,
    paddingTop: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
    fontFamily: 'Poppins-Regular',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontFamily: 'Poppins-Regular',
  },
  filterContainer: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#2ACE99',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    textAlign: 'center',
    marginBottom: 15,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
  },
  applyButton: {
    backgroundColor: '#2ACE99',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});