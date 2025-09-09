import HeaderComponent from '@/components/HeaderComponent';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const UsedTicketsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Eventro." />

      <Text>Used Ticket Screen</Text>
    </SafeAreaView>
  );
};

export default UsedTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});