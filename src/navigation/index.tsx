import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthContext} from '../context/AuthContext';
import AuthNavigator from './AuthNavigation';
import MainNavigator from './MainNavigator';

const Navigation = () => {
  const {email} = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  const navigationOptions = {headerShown: false};

  return (
    <Stack.Navigator>
      {email === '' ? (
        <Stack.Screen
          name="AuthNavigator"
          component={AuthNavigator}
          options={navigationOptions}
        />
      ) : (
        <Stack.Screen
          name="MainNavigator"
          component={MainNavigator}
          options={navigationOptions}
        />
      )}
    </Stack.Navigator>
  );
};

export default Navigation;
