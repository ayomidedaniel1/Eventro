import { FilterRowProps } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

export default function FilterRowComponent({
  filterDate,
  setFilterDate,
  filterLocation,
  setFilterLocation,
  filterGenre,
  setFilterGenre,
  filterStatus,
  setFilterStatus,
}: FilterRowProps) {
  return (
    <View style={styles.filterRow}>

      <Picker
        selectedValue={filterDate}
        onValueChange={setFilterDate}
        style={{ flex: 1 }}
        mode='dropdown'
      >
        <Picker.Item label="Date" value="" style={styles.picker} />
        <Picker.Item label="Today" value={new Date().toISOString().split('T')[0]} style={styles.picker} />
        <Picker.Item label="Tomorrow" value={new Date(Date.now() + 86400000).toISOString().split('T')[0]} style={styles.picker} />
        <Picker.Item label="This Week" value={new Date(Date.now() + 604800000).toISOString().split('T')[0]} style={styles.picker} />
      </Picker>

      <Picker
        selectedValue={filterLocation}
        onValueChange={setFilterLocation}
        style={{ flex: 1 }}
        mode='dropdown'
      >
        <Picker.Item label="Location" value="" style={styles.picker} />
        <Picker.Item label="New York" value="New York" style={styles.picker} />
        <Picker.Item label="Boston" value="Boston" style={styles.picker} />
        <Picker.Item label="Los Angeles" value="Los Angeles" style={styles.picker} />
        <Picker.Item label="London" value="London" style={styles.picker} />
        <Picker.Item label="Bronx" value="Bronx" style={styles.picker} />
      </Picker>

      <Picker
        selectedValue={filterGenre}
        onValueChange={setFilterGenre}
        style={{ flex: 1 }}
        mode='dropdown'
      >
        <Picker.Item label="Genre" value="" style={styles.picker} />
        <Picker.Item label="Country" value="Country" style={styles.picker} />
        <Picker.Item label="Football" value="Football" style={styles.picker} />
        <Picker.Item label="Theatre" value="Theatre" style={styles.picker} />
        <Picker.Item label="R&B" value="R&B" style={styles.picker} />
        <Picker.Item label="Rock" value="Rock" style={styles.picker} />
        <Picker.Item label="Baseball" value="Baseball" style={styles.picker} />
        <Picker.Item label="Performance Art" value="Performance Art" style={styles.picker} />
      </Picker>

      <Picker
        selectedValue={filterStatus}
        onValueChange={setFilterStatus}
        style={{ flex: 1 }}
        mode='dropdown'
      >
        <Picker.Item label="Status" value="" style={styles.picker} />
        <Picker.Item label="Onsale" value="onsale" style={styles.picker} />
        <Picker.Item label="Offsale" value="offsale" style={styles.picker} />
      </Picker>

    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  picker: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});