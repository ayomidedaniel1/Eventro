import TicketSkeleton from '@/components/skeletons/TicketSkeleton';
import ActiveTicket from '@/components/tickets/ActiveTicket';
import { EventInsert } from '@/types';
import { StyleSheet, View } from 'react-native';

const ActiveTicketsScreen = ({ events, isLoading }: { events: EventInsert[]; isLoading: boolean; }) => {
  return (
    <View style={styles.container}>

      {isLoading
        ? Array(5)
          .fill(null)
          .map((_, index) => (
            <TicketSkeleton key={`skeleton-${index}`} />
          ))
        : events.map((event) => (
          <View key={event.id}>
            <ActiveTicket event={event} />
          </View>
        ))}

    </View>
  );
};

export default ActiveTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});