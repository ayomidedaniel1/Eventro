import { EventListProps } from '@/types';
import { FlatList, StyleSheet, Text } from 'react-native';
import EventCardSkeleton from './skeletons/EventCardSkeleton';

export default function EventListComponent({
  data,
  renderItem,
  keyExtractor,
  isLoading,
}: EventListProps) {
  const EmptyComponent = () => (!isLoading && data.length === 0 ? (
    <Text style={styles.empty}>No events available.</Text>
  ) : null);

  const SkeletonComponent = () => (
    isLoading ? (
      Array(4)
        .fill(null)
        .map((_, index) => (
          <EventCardSkeleton key={`skeleton-${index}`} />
        ))
    ) : null
  );

  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.list}
      ListEmptyComponent={EmptyComponent}
      ListHeaderComponent={SkeletonComponent}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 15,
    paddingTop: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontFamily: 'Manrope-Regular',
  },
});