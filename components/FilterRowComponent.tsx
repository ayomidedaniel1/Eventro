import { FilterRowProps } from '@/types';
import { Image } from 'expo-image';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function FilterRowComponent({
  filterGenre,
  setFilterGenre,
}: FilterRowProps) {
  const filters = [
    { name: 'All', img: require('@/assets/images/tags/all.png') },
    { name: 'Movies', img: require('@/assets/images/tags/movies.png') },
    { name: 'Art', img: require('@/assets/images/tags/art.png') },
    { name: 'Music', img: require('@/assets/images/tags/music.png') },
    { name: 'Comedy', img: require('@/assets/images/tags/comedy.png') },
    { name: 'Books', img: require('@/assets/images/tags/books.png') },
  ];

  const [tagSelect, setTagSelect] = useState<string | null>(filterGenre);

  const handleTagPress = (tagName: string) => {
    if (tagSelect === tagName) {
      setTagSelect(null);
      setFilterGenre('');
    } else {
      setTagSelect(tagName);
      setFilterGenre(tagName);
    }
  };

  return (
    <View style={styles.filterRow}>

      <ScrollView
        style={styles.tagsContainer}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center', gap: 12, }}
        horizontal
      >
        {filters.map(tag => (
          <TouchableOpacity
            activeOpacity={0.9}
            key={tag.name}
            style={[
              styles.tags,
              tagSelect === tag.name
                ? { backgroundColor: '#FFFFFF', }
                : { backgroundColor: '#1C1C1E' }]}
            onPress={() => handleTagPress(tag.name)}
          >
            <View style={[
              styles.imageContainer,
              tagSelect === tag.name
                ? { backgroundColor: 'transparent' }
                : { backgroundColor: 'rgba(221, 221, 221, 0.2)', }]}>
              <Image
                style={styles.image}
                source={tag.img}
                contentFit='cover'
              />
            </View>

            <Text style={[
              styles.text,
              tagSelect === tag.name
                ? { color: '#010101' }
                : { color: '#FFFFFF', }]}>
              {tag.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingLeft: 7,
    paddingRight: 20,
    gap: 10,
    minWidth: 94,
    height: 48,
    borderRadius: 100,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8.26087,
    gap: 8.26,
    width: 38,
    height: 38,
    borderRadius: 82.6087,
  },
  image: {
    width: 16,
    height: 24,
  },
  text: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 24,
  },
});