import { StyleSheet, Text, View } from 'react-native';

const UsedTicketsScreen = () => {
  return (
    <View style={styles.container}>

      <Text>Used Ticket Screen</Text>
    </View>
  );
};

export default UsedTicketsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
});