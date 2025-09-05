import { ProfileHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileHeaderComponent({ name, email, avatar }: ProfileHeaderProps) {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatar }}
        style={styles.avatar}
        contentFit='cover'
      />

      <View style={styles.textContainer}>
        <Pressable style={styles.nameContainer} onPress={() => { }}>
          <TextInput
            style={styles.name}
            placeholderTextColor={'#FFF'}
            placeholder={name}
          />
          <Ionicons name='pencil' size={16} color={'#DDDDDD'} />
        </Pressable>

        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginTop: 21,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
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
    textAlign: 'center',
    color: '#E5E6E6',
  },
});