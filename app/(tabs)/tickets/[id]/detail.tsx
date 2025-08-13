import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const TicketDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>TicketDetail</Text>
    </SafeAreaView>
  );
};

export default TicketDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});