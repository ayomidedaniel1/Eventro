import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import type { ComponentProps } from 'react';
type ProfileActionsProps = {
  action: () => void;
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export default function ProfileActionsComponent({ action, title, icon }: ProfileActionsProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.actionsContainer} onPress={action}>
      <Ionicons name={icon} size={20} color="#1E1E1E" />
      <Text style={styles.actionText}>{title}</Text>
      <Ionicons name="chevron-forward-outline" size={20} color="#1E1E1E" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 11,
    height: 44,
    borderRadius: 200,
  },
  actionButton: {
    backgroundColor: '#2ACE99',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});