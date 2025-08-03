import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const PopularEvents = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>🔥 Popular Event</Text>

      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 50 }} style={styles.eventsContainer}>
        <View style={styles.eventCard}>
          <View style={styles.imgContainer}>
            <Image
              //  source={{ uri: event.image }} 
              source={'@assets/images/icons/smile.png'}
              style={styles.image}
              contentFit='cover'
            />
            <View style={styles.dateContainer}>
              <Text style={styles.date}>20</Text>
              <Text style={styles.month}>Mar</Text>
            </View>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Design Talks 2025</Text>
            <View style={styles.locationContainer}>
              <Ionicons name='location' size={12} color={'#523FFF'} />
              <Text style={styles.location}>Lagos</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PopularEvents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 14,
  },
  headerText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 22,
    color: '#1D1D1D',
    textAlign: 'left',
  },
  eventsContainer: {
    marginVertical: 12,
  },
  eventCard: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    isolation: 'isolate',
    width: 210,
    height: 248,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imgContainer: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'relative',
  },
  image: {
    width: 210,
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  dateContainer: {
    position: 'absolute',
    // bottom:12,
    top: 82,
    left: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    gap: 2,
    width: 46,
    height: 46,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    zIndex: 2,
  },
  date: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.02,
    color: '#1D1D1D',
  },
  month: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.02,
    color: ' rgba(29, 29, 29, 0.5)',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
    zIndex: 1,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    letterSpacing: -0.02,
    color: '#1D1D1D',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    gap: 4,
  },
  location: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    letterSpacing: -0.02,
    color: 'rgba(29, 29, 29, 0.5)',
  },
});