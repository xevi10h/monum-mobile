import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import AuthNavigator from './src/auth/navigator/AuthNavigator';
import GoogleAuthService from './src/auth/services/GoogleAuthService';

function App() {
  useEffect(() => {
    GoogleAuthService.configureGoogleSignIn();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
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
