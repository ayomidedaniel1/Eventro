import { SearchBarProps } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';

export default function SearchBarComponent({
  value,
  onChangeText,
  isLoading,
  placeholder,
  placeholderTextColor,
}: SearchBarProps) {
  return (
    <View style={styles.searchWrapper}>
      <Ionicons name="search" size={20} color="#2ACE99" />

      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />

      {isLoading && <ActivityIndicator size="small" color="#2ACE99" />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 11,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 19,
    color: '#C4C4C4',
  },
});