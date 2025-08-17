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
    paddingTop: (StatusBar.currentHeight ?? 0) - 16,
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    lineHeight: 30,
    alignItems: 'center',
    textAlign: "left",
    color: '#DFF1E2',
  },
});