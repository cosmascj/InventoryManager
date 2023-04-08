/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {AuthContext} from '../context/AuthContext';
import InventoryData from '../components/InventoryData';
import {AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  borderGrey,
  textPrimary,
  primaryBlue,
  waringRed,
} from '../constants/colors';
import Button from '../components/Button';
import AddIcon from '../assets/icons/addIcon.svg';
import Logout from '../assets/icons/logOutIcon.svg';
import Empty from '../assets/icons/empty.svg';
import uuid from 'react-native-uuid';

const iconStyle = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height / 5.9,
};
const InventoryList = () => {
  const {logout, email} = useContext(AuthContext);
  const STORAGE_KEY = `${email}_InventoryItem`;

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemStockNumber, setItemStockNumber] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [uniqueId, setUniqueId] = useState(uuid.v4());
  const [deleteID, setDeleteId] = useState('');
  const [editID, setEditID] = useState('');
  const [asyncData, setAsyncData] = useState({});
  const refectKeys = () => {
    const inventroyID = uuid.v4();
    setUniqueId(inventroyID);
  };
  let productLimit = [...Array(2).keys()];
  const clearForm = () => {
    setItemDescription('');
    setItemName('');
    setItemPrice('');
    setItemStockNumber('');
    setTimeout(() => {
      setModalVisible(false);
      setEditModalVisible(false);
    }, 200);
    // getInventory();
    refectKeys();
  };
  const handleSetEditData = (
    Id: string,
    description: string,
    name: string,
    price: string,
    number: string,
  ) => {
    setUniqueId(Id);
    setItemDescription(description);
    setItemName(name);
    setItemPrice(price);
    setItemStockNumber(number);
  };
  const data = {
    uniqueId,
    itemDescription,
    itemName,
    itemPrice,
    itemStockNumber,
  };

  const items = {
    data,
  };

  const updateStore = async () => {
    // const itemId = uniqueId;
    const newItem = {
      uniqueId,
      itemDescription,
      itemName,
      itemPrice,
      itemStockNumber,
    };
    items[uniqueId] = newItem;
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      if (existingData) {
        const newData = JSON.parse(existingData).concat(newItem);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        console.log('Existing data updated successfully.');
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([data]));
        console.log('New data saved successfully.');
      }
      clearForm();
    } catch (error) {
      console.log('There was an error saving the product', error);
    }
  };
  const handleDeleteInventory = async (
    productId: string,
    isEditing: Boolean,
  ) => {
    const newItem = {
      uniqueId,
      itemDescription,
      itemName,
      itemPrice,
      itemStockNumber,
    };
    items[uniqueId] = newItem;

    if (productId) {
      try {
        const existingData = await AsyncStorage.getItem(STORAGE_KEY);
        if (existingData) {
          const newData = JSON.parse(existingData);
          const filteredData = JSON.parse(existingData).filter(
            (obj: {uniqueId: string}) => obj.uniqueId !== productId,
          );
          console.log(filteredData, 'ooo');
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
          console.log('Existing data updated successfully.');
        } else {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([data]));
          console.log('New data saved successfully.');
        }

        isEditing ? console.log('editing') : clearForm();
      } catch (error) {
        console.log('There was an error saving the product', error);
      }
    } else {
      Alert.alert('Something went wrong please try Again');
    }
  };

  useEffect(() => {
    const getInventory = async () => {
      try {
        const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedItems = JSON.parse(storedItems);
        console.log('inventory', parsedItems);
        setAsyncData(parsedItems);
        return parsedItems;
      } catch (error) {
        console.log(error);
        return [];
      }
    };
    getInventory();
  }, [uniqueId, email, STORAGE_KEY]);
  const FLATLISTDATA = asyncData;
  const openEditInventoryModal = async (productId: string) => {
    try {
      const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
      const parsedItems = JSON.parse(storedItems);
      const itemToRetrieve = productId;
      // const retrievedItem = parsedItems[itemToRetrieve];

      const inventory = parsedItems.find(i => i.uniqueId === productId);
      if (inventory) {
        handleSetEditData(
          inventory.uniqueId,
          inventory.itemDescription,
          inventory.itemName,
          inventory.itemPrice,
          inventory.itemStockNumber,
        );
        setEditModalVisible(true);
      }
      console.log('idsss', inventory);
    } catch (error) {
      Alert.alert('something went wrong');
    }
  };
  const warningAlert = () =>
    Alert.alert('You are about to delete this product permanaetly', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          handleDeleteInventory(deleteID, false);
        },
      },
    ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            // multiget();
          }}
          style={styles.cardButton}>
          <AddIcon />
          <Text style={styles.text}>ADD ITEM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.cardButton}>
          <Logout />
          <Text style={{...styles.text, color: '#FF0000'}}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={FLATLISTDATA}
        keyExtractor={(item, index) => item?.uniqueId}
        renderItem={({item}) => (
          <InventoryData
            onPress={() => {
              openEditInventoryModal(item?.uniqueId);
              setDeleteId(item?.uniqueId);
              // handleDeleteInventory(item.uniqueId);
              // setEditModalVisible(true);
            }}
            name={item.itemName}
            price={item.itemPrice}
            total_stock={item.itemStockNumber}
            description={item.itemDescription}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Empty {...iconStyle} />
            <Text style={styles.textEmpty}>No Product available now</Text>
          </View>
        }
      />

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 10}}
              onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={25} color="#FF0000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter item name"
              value={itemName}
              onChangeText={name => setItemName(name)}
            />
            <TextInput
              style={styles.input}
              placeholder="Set item price"
              keyboardType="number-pad"
              value={itemPrice}
              onChangeText={price => setItemPrice(price)}
            />
            <TextInput
              style={styles.input}
              placeholder="Item description"
              value={itemDescription}
              onChangeText={description => setItemDescription(description)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total stock available"
              value={itemStockNumber}
              keyboardType="number-pad"
              onChangeText={stock_number => setItemStockNumber(stock_number)}
            />
            <View style={{marginVertical: 10}}>
              <Button
                backgroundColor={primaryBlue}
                text="ADD ITEM"
                onPress={() => {
                  updateStore();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="fade" transparent visible={editModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginRight: 10}}
              onPress={() => {
                clearForm();
                setEditModalVisible(false);
              }}>
              <AntDesign name="close" size={25} color="#FF0000" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter item name"
              value={itemName}
              onChangeText={name => setItemName(name)}
            />
            <TextInput
              style={styles.input}
              placeholder="Set item price"
              keyboardType="number-pad"
              value={itemPrice}
              onChangeText={price => setItemPrice(price)}
            />
            <TextInput
              style={styles.input}
              placeholder="Item description"
              value={itemDescription}
              onChangeText={description => setItemDescription(description)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total stock available"
              value={itemStockNumber}
              keyboardType="number-pad"
              onChangeText={stock_number => setItemStockNumber(stock_number)}
            />
            <View style={{marginVertical: 10}}>
              <Button
                backgroundColor={primaryBlue}
                text="EDIT ITEM"
                onPress={() => {
                  updateStore();
                }}
              />
              <Button
                style={{marginVertical: 10}}
                backgroundColor={waringRed}
                text="DELETE ITEM"
                onPress={() => {
                  warningAlert();
                }}
              />
            </View>
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
  header: {
    paddingHorizontal: 10,
    marginTop: '20%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addItem: {
    backgroundColor: primaryBlue,
    width: '100%',
    alignContent: 'center',
    borderRadius: 2,
  },
  cardButton: {
    flexDirection: 'row',
  },
  logout: {
    backgroundColor: primaryBlue,
    width: '100%',
    alignContent: 'center',
    marginTop: 10,
    borderRadius: 2,
  },
  text: {
    textAlign: 'center',
    padding: 5,
    fontWeight: 'bold',
  },
  emptyList: {
    flex: 1,
    marginTop: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B6C7E',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: '30%',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'white',
    borderRadius: 20,
    width: '95%',
    padding: 15,
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
    width: '95%',
    height: 40,
    padding: 5,
    borderRadius: 3,
    borderColor: borderGrey,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sheetListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: borderGrey,
  },
  sheetListItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
    // borderTopWidth: 1,
    borderTopColor: borderGrey,
  },
  sheetListItemText: {
    marginLeft: 10,
  },
  sheetMenuItemText: {
    color: textPrimary,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
