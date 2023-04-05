import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import InventoryList from '../screens/InventoryList';
const MainNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const navigationOptions = {headerShown: false};

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InventoryList"
        component={InventoryList}
        options={navigationOptions}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
