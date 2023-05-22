import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
// import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LoginScreen from './src/screens/LoginScreen';

function App(): JSX.Element {
  GoogleSignin.configure({
    webClientId:
      '944908105248-u4k7dp5du3a3ahcg1u6a284u0mri26av.apps.googleusercontent.com',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
