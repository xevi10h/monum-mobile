import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {store} from './src/redux/store';
import MainNavigator from './src/MainNavigator';
import GoogleAuthService from './src/auth/services/GoogleAuthService';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import client from './src/graphql/connection';
import TrackPlayer from 'react-native-track-player';

function App() {
  useEffect(() => {
    GoogleAuthService.configureGoogleSignIn();
  }, []);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </ApolloProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
