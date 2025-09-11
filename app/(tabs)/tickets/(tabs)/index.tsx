import { StyleSheet, Text, View } from 'react-native';

const ActiveTicketsScreen = () => {
  return (
    <View style={styles.container}>

      <Text>Active Ticket Screen</Text>
    </View>
  );
};

export default ActiveTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});