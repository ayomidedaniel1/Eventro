import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { EventInfoProp } from '@/types';
import { Ionicons } from '@expo/vector-icons';

const EventInfo = ({ title, icon, data }: EventInfoProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons color={'#F5F5F5'} size={20} name={icon} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.data}>{data}</Text>
      </View>
    </View>
  );
};

export default EventInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    height: 56,
  },
  iconContainer: {
    width: 46,
    height: 46,
    backgroundColor: '#F5F5F5',
    borderWidth: 0.46,
    borderColor: '#DDDDDD',
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 56,
    gap: 2,
  },
  title: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#E5E6E6',
  },
  data: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
});