import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const SavedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>SavedScreen</Text>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});