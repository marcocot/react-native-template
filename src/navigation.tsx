import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Register: undefined;
  Profile: undefined;
  Shops: undefined;
};

export type NavigationPropsType<RouteName extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, RouteName>;
};
