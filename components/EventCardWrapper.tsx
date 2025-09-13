import EventCard from '@/components/EventCard';
import { EventCardWrapperProps } from '@/types';
import { JSX } from 'react';
import { TouchableOpacity } from 'react-native';

export default function EventCardWrapper({ item, onPress }: EventCardWrapperProps): JSX.Element {
  return (
    <TouchableOpacity
      style={{ flex: 1, }}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <EventCard event={item} />
    </TouchableOpacity>
  );
}
