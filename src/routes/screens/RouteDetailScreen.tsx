import {View} from 'react-native';
import {RouteDetailScreenProps} from '../navigator/RoutesNavigator';
import {Text} from 'react-native';

export default function RouteDetailScreen({
  route,
  navigation,
}: RouteDetailScreenProps) {
  return (
    <View>
      <Text>RouteDetailScreen</Text>
    </View>
  );
}
