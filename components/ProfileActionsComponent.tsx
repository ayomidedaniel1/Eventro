import { ProfileActionsProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Key } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileActionsComponent({ action, title, icon }: ProfileActionsProps, key?: Key) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.actionsContainer} onPress={action} key={key}>
      <View style={styles.textContainer}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={16} color="#012508" />
        </View>
        <Text style={styles.actionText}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color="#FFFFFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    width: '100%',
    gap: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'flex-start',
  },
  icon: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderWidth: .34,
    borderColor: '#FFFFFF',
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
});