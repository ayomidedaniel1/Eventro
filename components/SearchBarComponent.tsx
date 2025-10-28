import { SearchBarProps } from '@/types';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchBarComponent({
  value,
  onChangeText,
  isLoading,
  placeholder,
  placeholderTextColor,
}: SearchBarProps) {
  return (
    <View style={styles.searchWrapper}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7D7F82" />

        <TextInput
          style={styles.searchInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
        />
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.filterContainer}>
        <AntDesign name='filter' color={'#7D7F82'} size={16} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 0,
    gap: 8,
    height: 54,
    backgroundColor: 'transparent',
  },
  searchContainer: {
    height: 54,
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#434344',
    borderRadius: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 7,
    height: 45,
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#7D7F82',
  },
  filterContainer: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderWidth: 0.931035,
    borderColor: '#434344',
    borderRadius: 27.931,
  },
});