import HeaderComponent from '@/components/HeaderComponent';
import ProfileActionsComponent from '@/components/ProfileActionsComponent';
import ProfileHeaderComponent from '@/components/ProfileHeaderComponent';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/utils/supabase';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { user, setAuth } = useAuthStore();
  const router = useRouter();
  console.log('User >>', user?.user_metadata);

  if (!user) return <Text style={styles.error}>Please log in</Text>;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuth(null);
    router.replace('/');
  };

  const actionComponent = [
    {
      route: () => router.push("/profile/payment-methods"),
      title: "Payment methods",
      icon: 'card-outline' as const
    },
    {
      route: () => router.push("/profile/notifications"),
      title: "Notifications",
      icon: 'notifications-outline' as const
    },
    {
      route: () => router.push("/profile/support"),
      title: "Support",
      icon: 'chatbox-outline' as const
    },
    {
      route: () => router.push("/profile/about-us"),
      title: "About us",
      icon: 'chatbubbles-outline' as const
    },
    {
      route: handleLogout,
      title: "Log out",
      icon: 'log-out-outline' as const
    },
  ];

  const handleImageUpload = async () => {
    setIsUploading(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setIsUploading(false);
      setSnackbarMessage('Permission denied to access camera roll.');
      setSnackbarVisible(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      const fileUri = result.assets[0].uri;
      const file = await fetch(fileUri);
      const blob = await file.blob();
      const fileExt = fileUri.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { upsert: true });

      if (uploadError) {
        setIsUploading(false);
        setSnackbarMessage(`Upload failed: ${uploadError.message}`);
        setSnackbarVisible(true);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { data, error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      setIsUploading(false);
      if (updateError) {
        setSnackbarMessage(`Update failed: ${updateError.message}`);
      } else if (data.user) {
        setAuth(data.user);
        setSnackbarMessage('Profile image updated successfully!');
      }
      setSnackbarVisible(true);
    } else {
      setIsUploading(false);
    }
  };

  const handleNameUpdate = async (newName: string) => {
    const { data, error } = await supabase.auth.updateUser({
      data: { name: newName },
    });

    if (error) {
      setSnackbarMessage(`Update failed: ${error.message}`);
    } else if (data.user) {
      setAuth(data.user);
      setSnackbarMessage('Name updated successfully!');
    }
    setSnackbarVisible(true);
  };

  const onDismissSnackbar = () => setSnackbarVisible(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <HeaderComponent title="Eventro." />

        <ProfileHeaderComponent
          name={user.user_metadata?.name || ''}
          email={user.user_metadata?.email || ''}
          avatar={user.user_metadata?.avatar_url || require('@/assets/images/icon.png')}
          onUpload={handleImageUpload}
          onNameUpdate={handleNameUpdate}
          isUploading={isUploading}
        />

        <View style={styles.actionsContainer}>
          {actionComponent.map((action, index) => (
            <View key={action.title} style={{ width: '100%' }}>
              <ProfileActionsComponent
                action={action.route}
                title={action.title}
                icon={action.icon}
              />
              {index < actionComponent.length - 1 && <View style={styles.line} />}
            </View>
          ))}
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={onDismissSnackbar}
          duration={3000}
          style={styles.snackbar}
          action={{
            label: 'Dismiss',
            onPress: onDismissSnackbar,
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  error: {
    textAlign: 'center',
    marginTop: 60,
    color: 'red',
    fontFamily: 'Manrope-Regular',
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
    backgroundColor: '#1C1C1E',
    borderRadius: 30,
  },
  line: {
    width: '85%',
    alignSelf: 'center',
    borderWidth: 0.3,
    height: 0,
    borderColor: '#7D7F82',
    marginTop: 5,
  },
  snackbar: {
    top: 0,
    position: 'absolute',
    width: '100%',
    backgroundColor: '#2ACE99',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});