import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import {RootStackParamList} from '../../types';

const AuthNavigator = () => {
  //   const Stack = createNativeStackNavigator();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const navigationOptions = {headerShown: false};

  return (
    <Stack.Navigator>
      {/* {screens.map(({ name, screen }) => (
        <Stack.Screen
          name={name}
          component={screen}
          options={navigationOptions}
          key={name}
        />
      ))} */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={navigationOptions}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
