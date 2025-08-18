import HeaderComponent from '@/components/HeaderComponent';
import { useAuthStore } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={styles.arrowBack}
        >
          <Ionicons name="chevron-back-outline" size={26} color="#1D1D1D" />
        </TouchableOpacity>
        <HeaderComponent title="Personal Info" />
      </View>

      <View style={styles.content}>
        <TouchableOpacity activeOpacity={0.8} style={styles.avatar}>
          <Image
            source={{ uri: user?.user_metadata?.avatar_url || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
            contentFit='cover'
          />
        </TouchableOpacity>

        <View style={styles.inputField}>
          <Text style={styles.title}>Full Name</Text>
          <TextInput
            defaultValue={user?.user_metadata?.name}
            style={styles.input}
            placeholderTextColor={'#1E1E1E'}
            keyboardType='default'
          // onChangeText={}
          // value={}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.title}>Email</Text>
          <TextInput
            defaultValue={user?.user_metadata?.email}
            style={styles.input}
            placeholderTextColor={'#1E1E1E'}
            keyboardType='default'
          // onChangeText={}
          // value={}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Update Info</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
    marginTop: 8,
  },
  arrowBack: {
    position: 'absolute',
    top: (StatusBar.currentHeight ?? 0) - 18,
    left: 0,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    width: '100%',
    marginTop: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 200,
  },
  inputField: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
    width: '100%',
  },
  title: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#1E1E1E',
  },
  input: {
    padding: 16,
    width: '100%',
    height: 46,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    color: '#1E1E1E',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 10,
    width: '100%',
    height: 46,
    backgroundColor: '#2ACE99',
    borderRadius: 200,
    marginTop: 7,
  },
  btnText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
