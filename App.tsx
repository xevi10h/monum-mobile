import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {store} from './src/redux/store';
import AuthNavigator from './src/auth/navigator/AuthNavigator';
import GoogleAuthService from './src/auth/services/GoogleAuthService';
import {Provider} from 'react-redux';

function App() {
  useEffect(() => {
    GoogleAuthService.configureGoogleSignIn();
  }, []);
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AuthNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
