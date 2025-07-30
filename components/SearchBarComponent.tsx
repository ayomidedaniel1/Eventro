import { SearchBarProps } from '@/types';
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
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {isLoading && <ActivityIndicator size="small" color="#2ACE99" style={styles.loadingIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loadingIndicator: {
    marginLeft: 10,
  },
});