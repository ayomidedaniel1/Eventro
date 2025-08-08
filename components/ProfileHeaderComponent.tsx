import { Image, StyleSheet, Text, View } from 'react-native';

type ProfileHeaderProps = {
  name: string;
  email: string;
  avatar: string;
};

export default function ProfileHeaderComponent({ name, email, avatar }: ProfileHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 16,
    height: 100,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    color: '#1D1D1D',
    alignSelf: 'stretch',
  },
  email: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
    color: 'rgba(29, 29, 29, 0.5)',
    alignSelf: 'stretch',
  },
});