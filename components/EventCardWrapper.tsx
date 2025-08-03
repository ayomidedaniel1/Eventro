import EventCard from '@/components/EventCard';
import { EventCardWrapperProps } from '@/types';
import { TouchableOpacity } from 'react-native';

export default function EventCardWrapper({ item, router }: EventCardWrapperProps) {
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/events/[id]/detail', params: { id: item.id } })}
      activeOpacity={0.8}
    >
      <EventCard event={item} />
    </TouchableOpacity>
  );
}