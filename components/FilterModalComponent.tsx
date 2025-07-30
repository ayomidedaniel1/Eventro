import { FilterModalProps } from '@/types';
import { Picker } from '@react-native-picker/picker';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FilterModalComponent({
  visible,
  onClose,
  filterDate,
  setFilterDate,
  filterLocation,
  setFilterLocation,
  filterGenre,
  setFilterGenre,
  filterStatus,
  setFilterStatus,
  onApply,
  onClear,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter Events</Text>
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
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.clearButton]} onPress={onClear}>
              <Text style={styles.modalButtonText}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.applyButton]} onPress={onApply}>
              <Text style={styles.modalButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#2ACE99',
    textAlign: 'center',
    marginBottom: 15,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  pickerItem: {
    fontFamily: 'Poppins-Regular',
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
  },
  applyButton: {
    backgroundColor: '#2ACE99',
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});