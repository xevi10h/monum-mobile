import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';

import MapScreen from './map/screens/MapScreen';
import ProfileScreen from './profile/screens/ProfileScreen';

// Define un tipo para las rutas
export type RootBottomTabList = {
  List: undefined;
  Map: undefined;
  Profile: undefined;
};

const Tab = createMaterialBottomTabNavigator<RootBottomTabList>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Map">
      <Tab.Screen name="List" component={ProfileScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
