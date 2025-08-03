import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NewEvents = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>New Event</Text>
        <Text style={styles.navText}>See All</Text>
      </View>

      <View style={styles.eventContainer}>
        <Image
          //  source={{ uri: event.image }} 
          source={'@assets/images/icons/smile.png'}
          style={styles.image}
          contentFit='cover'
        />

        <View style={styles.dataContainer}>
          <Text style={styles.date}>21 Mei 2025</Text>
          <Text style={styles.title}>Indie Film Night</Text>
          <View style={styles.locationContainer}>
            <Ionicons name='location' size={12} color={'#2ACE99'} />
            <Text style={styles.location}>Lagos</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1D1D1D',
    textAlign: 'left',
    letterSpacing: -0.02,
  },
  navText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: '#655CBB',
  },
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0,
    gap: 16,
    width: 335,
    height: 88,
    marginBottom: 8,
  },
  image: {
    width: 64,
    height: 88,
    borderRadius: 12,
  },
  dataContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 4,
    gap: 6,
    width: 255,
    height: 88,
  },
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: '#655CBB',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: '#1D1D1D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: 'rgba(29, 29, 29, 0.5)',
  },
});