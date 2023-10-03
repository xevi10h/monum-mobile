import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {store} from './src/redux/store';
import AuthNavigator from './src/auth/navigator/AuthNavigator';
import GoogleAuthService from './src/auth/services/GoogleAuthService';
import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import client from './src/graphql/connection';
import TrackPlayer from 'react-native-track-player';

function App() {
  useEffect(() => {
    GoogleAuthService.configureGoogleSignIn();
    const startPlayer = async () => {
      await TrackPlayer.setupPlayer();
    };
    startPlayer();
  }, []);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <AuthNavigator />
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
