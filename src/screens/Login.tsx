import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {borderGrey, primaryBlue} from '../constants/colors';
import {AuthContext} from '../context/AuthContext';
import uuid from 'react-native-uuid';
// const a = uuid.v4
console.log(uuid.v4(), 'gg');
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  //@ts-ignore
  const {setAuthEmail} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const SaveData = () => {
  //     AsyncStorage.setItem('firstName', email);
  //     AsyncStorage.setItem('LastName', password);
  //   };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          // defaultValue={status}
          value={email}
          style={styles.input}
          onChangeText={email => setEmail(email)}
          placeholder="Enter any email"
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={password => setPassword(password)}
          placeholder="Password"
        />
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            // console.log(e, 'pp')
            setAuthEmail(email);
            navigation.navigate('InventoryList');
          }}
          style={styles.button}>
          <View style={{padding: 10, justifyContent: 'center'}}>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              PROCEED
            </Text>
          </View>
        </TouchableOpacity>
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
    marginTop: '40%',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: primaryBlue,
    borderRadius: 5,
  },
});
