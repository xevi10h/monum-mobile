import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import BottomTabNavigator from '../../BottomTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import LoginWithCredentialsScreen from '../screens/LoginWithCredentialsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useDispatch} from 'react-redux';
import {setupPlayer, updatePlayerState} from '../../redux/states/medias';
import {AppDispatch} from 'src/redux/store';
import TrackPlayer, {Event} from 'react-native-track-player';

// Define un tipo para las rutas
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  LoginWithCredentials: undefined;
  BottomTabNavigator: undefined;
};

// Crea el stack navigator
const Stack = createStackNavigator<RootStackParamList>();

function AuthNavigator() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setupPlayer());
    const onStateChange = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async data => {
        dispatch(updatePlayerState(data.state));
      },
    );
    return () => {
      onStateChange.remove();
    };
  }, [dispatch]);

  return (
    <NavigationContainer>
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
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthNavigator;
