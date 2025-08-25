import { ProfileHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileHeaderComponent({ name, email, avatar }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
        contentFit='cover'
      />

      <View style={styles.textContainer}>
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.name}
            placeholder={name}
          />
          <Ionicons name='pencil' size={20} color={'#DDDDDD'} />
        </View>

        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    // height: 192,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 139,
  },
  name: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 18,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  email: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'center',
    color: '#E5E6E6',
  },
});