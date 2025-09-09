import { SafeAreaView, StyleSheet, Text } from 'react-native';

const UsedTicketsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

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