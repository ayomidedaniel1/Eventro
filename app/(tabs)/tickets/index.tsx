import { SafeAreaView, StyleSheet, Text } from 'react-native';

const ActiveTicketsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <Text>Active Ticket Screen</Text>
    </SafeAreaView>
  );
};

export default ActiveTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});