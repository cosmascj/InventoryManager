import {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React from 'react';
import {AuthContext} from '../context/AuthContext';
import InventoryData from '../components/InventoryData';
import {AntDesign} from '@expo/vector-icons';

const InventoryList = () => {
  const {logout} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 10, marginTop: '20%'}}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: 'green',
            width: '100%',
            alignContent: 'center',
          }}>
          <Text style={{textAlign: 'center', padding: 5}}>ADD ITEM</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => logout()}
          style={{
            backgroundColor: 'green',
            width: '100%',
            alignContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{textAlign: 'center', padding: 5}}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <InventoryData name="Plastic Bag" price="default" total_stock="100" />

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <TextInput style={styles.input} placeholder="enter item name" />
            <TextInput style={styles.input} placeholder="Set item price" />
            <TextInput
              style={styles.input}
              placeholder="Total stock available"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InventoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: '30%',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 10,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    margin: 10,
    borderWidth: 1,
    width: '80%',
    padding: 5,
  },
});
