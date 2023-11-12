import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileDetailScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import {RootStackParamList} from 'src/auth/navigator/AuthNavigator';
import {RouteProp} from '@react-navigation/native';

export type ProfileStackParamList = {
  ProfileDetail: {
    navigationToLogin: RegisterScreenNavigationProp;
  };
  ChangePassword: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Register'
>;

export interface ProfileScreenProps {
  navigation: any; // Puedes tipificar esto más precisamente si lo deseas
}

type Props = {
  navigationToLogin: RegisterScreenNavigationProp;
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator({navigationToLogin}: Props) {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileDetail"
      screenOptions={{headerShown: false}}>
      <ProfileStack.Screen name="ProfileDetail">
        {({navigation}: ProfileScreenProps) => (
          <ProfileScreen
            navigationToLogin={navigationToLogin}
            navigation={navigation}
          />
        )}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
    </ProfileStack.Navigator>
  );
}
