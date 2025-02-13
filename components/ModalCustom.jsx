import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export const ModalCustom = ({
  visible,
  onClose,
  onSelect,
  selectedItem,
  items
}) => {

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="arrow-back" size={24} color="#002859" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Selecciona una divisa</Text>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ ...styles.item, backgroundColor: selectedItem?.abbreviation === item.abbreviation ? '#EFF2F7' : '#FFFFFF' }}
                onPress={() => onSelect(item)}
              >
                <View style={styles.currencyItem}>
                  <Image source={item.flag} style={styles.flagImage} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.text1}>{item.name}</Text>
                    <Text style={styles.text2}>{item.abbreviation}</Text>
                  </View>
                  <MaterialIcons
                    name={selectedItem?.abbreviation === item.abbreviation ? 'check-circle' : 'chevron-right'}
                    size={24}
                    color={selectedItem?.abbreviation === item.abbreviation ? 'rgba(0, 40, 89, 1)' : '#647184'}
                    style={styles.checkIcon}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Mulish_800ExtraBold',
    color: '#002859',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
    backgroundColor: '#EFF2F7',
    height: 28,
    width: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18
  },
  checkIcon: {
    marginLeft: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    borderRadius: 6,
    height: 54,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  flagImage: {
    width: 32,
    height: 32,
    marginRight: 10,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  text1: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#002859',
  },
  text2: {
    fontSize: 12,
    lineHeight: 16,
    color: '#647184',
  },
});