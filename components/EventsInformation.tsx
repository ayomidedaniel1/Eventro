import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EventInsert } from '@/types';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

type EventInformationProps = {
  event: EventInsert;
};

export default function EventInformation({ event }: EventInformationProps): JSX.Element {
  console.log('event>>> ', event);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: event.image }}
        style={styles.imgBg}
        contentFit="cover"
      >
        <LinearGradient
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 1 }}
          colors={['#67676729', '#010101E5']}
          style={styles.backgroundImageGradient}
        />
      </ImageBackground>

      <View style={styles.overlay}>
        <Text style={styles.title}>{event.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    width: '100%',
    height: 330,
  },
  backgroundImageGradient: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'left',
    color: '#FFFFFF',
    marginTop: -30,
  },
});
