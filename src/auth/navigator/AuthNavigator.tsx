import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import LoginWithCredentialsScreen from '../screens/LoginWithCredentialsScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Define un tipo para las rutas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  LoginWithCredentials: undefined;
  Main: undefined;
};

// Crea el stack navigator
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="LoginWithCredentials"
          component={LoginWithCredentialsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
