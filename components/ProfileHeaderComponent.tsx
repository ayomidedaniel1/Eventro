import { ProfileHeaderProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ProfileHeaderComponent({ name, email, avatar, onUpload, onNameUpdate, isUploading }: ProfileHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleSave = () => {
    if (onNameUpdate && editedName !== name) {
      onNameUpdate(editedName);
    }
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onUpload} style={styles.avatarContainer} disabled={isUploading} >
        <Image
          source={
            typeof avatar === 'string'
              ? { uri: avatar }
              : avatar && typeof avatar === 'object' && avatar.uri
                ? { uri: avatar.uri }
                : { uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }
          }
          style={[styles.avatar, isUploading && { opacity: 0.6 }]}
          contentFit='cover'
        />
        {isUploading && <ActivityIndicator size="small" color="#FFFFFF" style={styles.indicator} />}
      </Pressable>

      <View style={styles.textContainer}>
        <Pressable style={styles.nameContainer} onPress={() => setIsEditing(true)}>
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.name}
                value={editedName}
                onChangeText={setEditedName}
                placeholderTextColor={'#FFF'}
                autoFocus
                onBlur={handleSave}
              />
            </View>
          ) : (
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{editedName}</Text>
              <Ionicons name='pencil' size={16} color={'#DDDDDD'} />
            </View>
          )}
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
  avatarContainer: {
    position: 'relative',
    marginBottom: 7,
  },
  indicator: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginTop: 21,
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
  editContainer: {
    flexDirection: 'row',
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