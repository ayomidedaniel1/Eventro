import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileActionsProps = {
  action: () => void;
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
};

export default function ProfileActionsComponent({ action, title, icon }: ProfileActionsProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.actionsContainer} onPress={action}>
      <View style={styles.textContainer}>
        <Ionicons name={icon} size={20} color="#1D1D1D" />
        <Text style={styles.actionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color="rgba(30, 30, 30, 0.5)" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
  },
  actionText: {
    color: '#1D1D1D',
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 19,
  },
});