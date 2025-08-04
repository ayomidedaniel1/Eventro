import EventCard from '@/components/EventCard';
import { EventCardWrapperProps } from '@/types';
import { TouchableOpacity } from 'react-native';

export default function EventCardWrapper({ item, router }: EventCardWrapperProps) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/events/${item.id}/detail`)}
      activeOpacity={0.8}
    >
      <EventCard event={item} />
    </TouchableOpacity>
  );
}