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
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Any Date" value="" />
        <Picker.Item label="Today" value={new Date().toISOString().split('T')[0]} />
        <Picker.Item label="Tomorrow" value={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
        <Picker.Item label="This Week" value={new Date(Date.now() + 604800000).toISOString().split('T')[0]} />
      </Picker>
      <Picker
        selectedValue={filterLocation}
        onValueChange={setFilterLocation}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Any Location" value="" />
        <Picker.Item label="New York" value="New York" />
        <Picker.Item label="Boston" value="Boston" />
        <Picker.Item label="Los Angeles" value="Los Angeles" />
        <Picker.Item label="London" value="London" />
        <Picker.Item label="Bronx" value="Bronx" />
      </Picker>
      <Picker
        selectedValue={filterGenre}
        onValueChange={setFilterGenre}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Any Genre" value="" />
        <Picker.Item label="Country" value="Country" />
        <Picker.Item label="Football" value="Football" />
        <Picker.Item label="Theatre" value="Theatre" />
        <Picker.Item label="R&B" value="R&B" />
        <Picker.Item label="Rock" value="Rock" />
        <Picker.Item label="Baseball" value="Baseball" />
        <Picker.Item label="Performance Art" value="Performance Art" />
      </Picker>
      <Picker
        selectedValue={filterStatus}
        onValueChange={setFilterStatus}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item label="Any Status" value="" />
        <Picker.Item label="Onsale" value="onsale" />
        <Picker.Item label="Offsale" value="offsale" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 150,
    marginHorizontal: 5,
  },
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
});