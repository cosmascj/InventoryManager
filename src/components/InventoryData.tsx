import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Asset = {
  name: string;
  price: string;
  total_stock: string;
};

const InventoryData = (props: Asset) => {
  return (
    <View style={styles.container}>
      <View style={styles.listView}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          {props.name ?? 'name'}
        </Text>
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
    marginTop: '5%',
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  listOrientation: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
});
