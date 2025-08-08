import { HeaderProps } from '@/types';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function HeaderComponent({ title }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: (StatusBar.currentHeight ?? 0) - 18,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 27,
    alignItems: 'center',
    color: '#1D1D1D',
  },
});