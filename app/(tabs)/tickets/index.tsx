import HeaderComponent from '@/components/HeaderComponent';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const TicketScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="Eventro." />

      <Text>TicketScreen</Text>
    </SafeAreaView>
  );
};

export default TicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});