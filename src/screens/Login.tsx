/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */

import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {borderGrey, primaryBlue} from '../constants/colors';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> = () => {
  //@ts-ignore
  const {setAuthEmail} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const value = {
    email: email,
  };

  const storeUser = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.setItem(email, JSON.stringify(value));
      console.log('It was saved successfully');
      setTimeout(() => {
        setAuthEmail(email);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Something wenth wrong');
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          autoCapitalize="none"
          value={email}
          style={styles.input}
          onChangeText={email => setEmail(email)}
          placeholder="Enter any email"
          testID="email"
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={password => setPassword(password)}
          placeholder="Password"
          testID="password"
        />
      </View>
      <View style={{padding: 20}}>
        <Button
          textID="login"
          text="LOGIN"
          disabled={email === '' || password === ''}
          loading={isLoading}
          backgroundColor={primaryBlue}
          onPress={() => {
            storeUser();
          }}
          textStyle={styles.textStyle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: borderGrey,
    marginBottom: 17,
    borderRadius: 5,
    padding: 5,
  },
  wrapper: {
    padding: 20,
    marginTop: '50%',
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  textStyle: {},
});
