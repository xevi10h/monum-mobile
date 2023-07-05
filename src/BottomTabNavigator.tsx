import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Image, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import bottom_bar_list_inactive from './assets/images/icons/bottom_bar_list_inactive.png';
import bottom_bar_map_inactive from './assets/images/icons/bottom_bar_map_inactive.png';
import bottom_bar_profile_inactive from './assets/images/icons/bottom_bar_profile_inactive.png';
import MapScreen from './map/screens/MapScreen';
import ProfileScreen from './profile/screens/ProfileScreen';

const BOTTOM_TAB_NAVIGATOR_HEIGHT = 56;

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

const Tab = createBottomTabNavigator<RootBottomTabList>();

function BottomTabNavigator() {
  const [isTabBarVisible, setTabBarVisible] = useState(true);
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
          {
            tintColor: focused ? '#3F713B' : '#BDBDBD',
          },
        ]}
        resizeMode="contain"
      />
    );
  };

  return (
    <NavigationContainer independent={true}>
      <StatusBar translucent barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName="Map"
        screenOptions={{
          tabBarStyle: [
            styles.hol,
            {
              display: isTabBarVisible ? 'flex' : 'none',
              height: useSafeAreaInsets().bottom + BOTTOM_TAB_NAVIGATOR_HEIGHT,
            },
          ],
          tabBarShowLabel: false,
          headerShown: false,
        }}>
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
          options={{
            tabBarIcon: ({focused}) => renderTabBarIcon({focused, name: 'Map'}),
          }}>
          {() => <MapScreen setTabBarVisible={setTabBarVisible} />}
        </Tab.Screen>
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
  hol: {
    position: 'absolute',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default BottomTabNavigator;
