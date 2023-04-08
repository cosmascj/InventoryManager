import React from 'react';
// import {StatusBar} from 'expo-status-bar';
import {QueryClient, QueryClientProvider} from 'react-query';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider from './src/context/AuthContext';
import Navigation from './src/navigation';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#fff" /> */}
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthContextProvider>
            <Navigation />
          </AuthContextProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
