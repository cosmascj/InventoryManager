import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {AntDesign} from '@expo/vector-icons';
type Asset = {
  name: string;
  price: string;
  total_stock: string;
  description: string;
  onPress: () => void;
};

const InventoryData = (props: Asset) => {
  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            {props.name ?? 'name'}
          </Text>
          <TouchableOpacity onPress={props.onPress}>
            <AntDesign name="edit" size={22} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 11}}>{props.description}</Text>
        <View style={styles.listOrientation}>
          <Text>Price: </Text>
          <Text>{props.price}</Text>
        </View>
        <View style={styles.listOrientation}>
          <Text>Total Stock: </Text>

          <Text>{props.total_stock}</Text>
        </View>
      </View>
    </View>
  );
};

export default InventoryData;

const styles = StyleSheet.create({
  container: {
    // flex:1
  },
  listView: {
    marginTop: '3%',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  listOrientation: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
});
