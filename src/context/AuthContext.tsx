/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, createContext, useEffect, ReactNode} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

type LayoutProps = {
  children: ReactNode;
  // Your other props here.
};
const defaultState = {
  email: '',
  password: '',
};
export const AuthContext = createContext(defaultState);
const AuthContextProvider = ({children}: LayoutProps) => {
  const [loading, setLoading] = useState(true);
  const [email, setUserEmail] = useState('');
  const [password, setUserPassword] = useState('');

  const logout = () => {
    setUserEmail('');

    AsyncStorage.multiRemove(['email', 'password']);
    // AsyncStorage.clear();
  };
  const setAuthEmail = async (email: string) => {
    // setUserData();
    setUserEmail(email);
    AsyncStorage.setItem('email', email);
  };
  const setAuthPassword = (password = '') => {
    setUserPassword(password);
    AsyncStorage.setItem('first_name', password);
  };

  const getUserData = async () => {
    const email = await AsyncStorage.getItem('email');
    if (email) {
      setAuthEmail(email);
    }
    const password = await AsyncStorage.getItem('password');
    if (password) {
      setAuthPassword(password);
    }

    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  });

  const authState = {
    email,
    setAuthPassword,
    password,
    setAuthEmail,
    logout,
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <Loader />
      ) : (
        <AuthContext.Provider value={authState}>
          {children}
        </AuthContext.Provider>
      )}
    </View>
  );
};
export default AuthContextProvider;
