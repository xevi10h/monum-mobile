import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

import AuthNavigator from './src/auth/navigator/AuthNavigator';
import GoogleAuthService from './src/auth/services/GoogleAuthService';

function App() {
  useEffect(() => {
    GoogleAuthService.configureGoogleSignIn();
  }, []);
  return (
    <View style={styles.container}>
      <AuthNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
