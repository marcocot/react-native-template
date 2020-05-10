import React from 'react';
import {
  NavigationContainer,
  NavigationState,
  NavigationContainerRef,
  PartialState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { RootStackParamList } from '@app/navigation';
import { RegisterScreen } from '@app/screens/Register';
import { UserProfile } from '@app/screens/UserProfile';
import { store } from '@app/store';
import SplashScreen from 'react-native-splash-screen';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from '@app/services/apolloClient';

const getActiveRouteName = (state: NavigationState | PartialState<NavigationState>): string => {
  const route = state.routes[state.index || 0];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

const onStateChange = (state: NavigationState, previousRouteName: string): void => {
  const currentRouteName = getActiveRouteName(state);

  if (previousRouteName !== currentRouteName) {
    analytics().setCurrentScreen(currentRouteName, currentRouteName);
  }
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC<void> = () => {
  const routeNameRef = React.useRef('');
  const navigationRef = React.useRef<NavigationContainerRef>(null);

  React.useEffect(() => {
    const state = navigationRef?.current?.getRootState();
    if (!state) return;

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, [navigationRef]);

  React.useEffect(() => SplashScreen.hide(), []);

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={(state: NavigationState | undefined): void => {
            if (!state) return;
            onStateChange(state, routeNameRef.current);
          }}
        >
          <Stack.Navigator initialRouteName="Register" headerMode="none">
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Profile" component={UserProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
