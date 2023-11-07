import {createStackNavigator} from '@react-navigation/stack';

// Suponiendo que tienes estas screens
import ListCitiesScreen from '../screens/ListCitiesScreen';
import ListRoutesScreen from '../screens/ListRoutesScreen';
import ICity from '../../shared/interfaces/ICity';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import IRouteComplete from '../../shared/interfaces/IFullRoute';
import RouteDetailScreen from '../screens/RouteDetailScreen';

export type RoutesStackParamList = {
  ListCities: undefined;
  ListRoutes: {
    city: ICity;
  };
  RouteDetail: {
    route: IRouteComplete;
  };
};

export interface ListRoutesScreenProps {
  route: RouteProp<RoutesStackParamList, 'ListRoutes'>;
  navigation: any; // Puedes tipificar esto más precisamente si lo deseas
}

export interface RouteDetailScreenProps {
  route: RouteProp<RoutesStackParamList, 'RouteDetail'>;
  navigation: any; // Puedes tipificar esto más precisamente si lo deseas
}
const RoutesStack = createStackNavigator<RoutesStackParamList>();

export default function RoutesNavigator() {
  return (
    <RoutesStack.Navigator
      initialRouteName="ListCities"
      screenOptions={{headerShown: false}}>
      <RoutesStack.Screen name="ListCities" component={ListCitiesScreen} />
      <RoutesStack.Screen name="ListRoutes">
        {({route, navigation}: ListRoutesScreenProps) => (
          <ListRoutesScreen route={route} navigation={navigation} />
        )}
      </RoutesStack.Screen>
      <RoutesStack.Screen name="RouteDetail">
        {({route, navigation}: RouteDetailScreenProps) => (
          <RouteDetailScreen route={route} navigation={navigation} />
        )}
      </RoutesStack.Screen>
    </RoutesStack.Navigator>
  );
}
