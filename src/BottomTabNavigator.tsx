import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';

import bottom_bar_list_inactive from './assets/images/icons/bottom_bar_list_inactive.png';
import bottom_bar_map_inactive from './assets/images/icons/bottom_bar_map_inactive.png';
import bottom_bar_profile_inactive from './assets/images/icons/bottom_bar_profile_inactive.png';
import MapScreen from './map/screens/MapScreen';
import ProfileScreen from './profile/screens/ProfileScreen';

// Define un tipo para las rutas
export type RootBottomTabList = {
  List: undefined;
  Map: undefined;
  Profile: undefined;
};

// Define un tipo para los Bottom Tab Icons
export type BottomTabBarIconProps = {
  focused: boolean;
  name?: string;
};

const Tab = createMaterialBottomTabNavigator<RootBottomTabList>();

function BottomTabNavigator() {
  const renderTabBarIcon = ({focused, name}: BottomTabBarIconProps) => {
    let source;
    switch (name) {
      case 'List':
        source = bottom_bar_list_inactive;
        break;
      case 'Map':
        source = bottom_bar_map_inactive;
        break;
      case 'Profile':
        source = bottom_bar_profile_inactive;
        break;
      default:
        source = bottom_bar_profile_inactive;
        break;
    }
    return (
      <Image
        source={source}
        style={[
          styles.bottom_bar_logo_image,
          {tintColor: focused ? '#3F713B' : '#BDBDBD'},
        ]}
        resizeMode="contain"
      />
    );
  };

  return (
    <NavigationContainer independent={true}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Tab.Navigator initialRouteName="Map" labeled={false}>
        <Tab.Screen
          name="List"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabBarIcon({focused, name: 'List'}),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'Map'}),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) =>
              renderTabBarIcon({focused, name: 'Profile'}),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottom_bar_logo_image: {
    width: 30,
    height: 30,
  },
});

export default BottomTabNavigator;
