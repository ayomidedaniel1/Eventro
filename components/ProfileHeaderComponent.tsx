import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text } from 'react-native';

type ProfileHeaderProps = {
  name: string;
  location: string;
  avatar: string;
};

export default function ProfileHeaderComponent({ name, location, avatar }: ProfileHeaderProps) {
  return (
    <LinearGradient colors={['#2ACE99', '#B8FAD6']} style={styles.header}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.location}>{location}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    textAlign: 'center',
  },
  location: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#fff',
    textAlign: 'center',
  },
});