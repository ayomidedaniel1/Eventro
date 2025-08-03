import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ProfileActionsProps = {
  onLogout: () => void;
  onEdit: () => void;
};

export default function ProfileActionsComponent({ onLogout, onEdit }: ProfileActionsProps) {
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
        <Text style={styles.actionText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={onLogout}>
        <Text style={styles.actionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#2ACE99',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  actionText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});