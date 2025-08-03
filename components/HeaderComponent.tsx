import { HeaderProps } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, Text } from 'react-native';

export default function HeaderComponent({ title }: HeaderProps) {
  return (
    <LinearGradient
      colors={['#2ACE99', '#B8FAD6']}
      style={styles.header}
    >
      <Text style={styles.headerText}>{title}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerText: {
    fontSize: 21,
    lineHeight: 25,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});