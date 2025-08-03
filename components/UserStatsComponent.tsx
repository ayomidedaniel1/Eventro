import { StyleSheet, Text, View } from 'react-native';

type UserStats = {
  attendedEvents: number;
  createdEvents: number;
};

type UserStatsProps = {
  stats: UserStats;
};

export default function UserStatsComponent({ stats }: UserStatsProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Attended</Text>
        <Text style={styles.statValue}>{stats.attendedEvents}</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Created</Text>
        <Text style={styles.statValue}>{stats.createdEvents}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
    fontSize: 14,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    fontSize: 18,
  },
});