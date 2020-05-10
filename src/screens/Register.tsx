/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, View } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { useDispatch } from 'react-redux';
import { login } from '@app/features/login';
import { ErrorBoundary } from '@app/components/ErrorBoundary';
import { NavigationPropsType } from '@app/navigation';

const facebookLogin = async (): Promise<void> => {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  if (result.isCancelled) {
    throw new Error('User cancelled');
  }

  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw new Error('Cannot obtain access token');
  }

  const credentials = auth.FacebookAuthProvider.credential(data.accessToken);
  const userCredentials = await auth().signInWithCredential(credentials);
};

const register = async (email: string, password: string): Promise<void> => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    console.log(result);
  } catch (error) {
    const reset = await auth().sendPasswordResetEmail(email);
    console.warn(reset);
  }
};

const logOut = (): Promise<void> => {
  return auth().signOut();
};

type PropsType = NavigationPropsType<'Register'>;

export const RegisterScreen: React.FC<PropsType> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const isLoggedIn = !!user;

  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const dispatch = useDispatch();

  if (user) {
    dispatch(login({ uid: user.uid, displayName: user.displayName }));
  }

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (loading) {
        setLoading(false);
      }
    });
  });

  if (loading) return null;

  return (
    <>
      <Text>{user?.displayName}</Text>
      {!isLoggedIn ? <Button onPress={facebookLogin} title="Login con FB" /> : null}
      {!isLoggedIn ? (
        <View>
          <TextInput
            autoCompleteType="email"
            value={email}
            onChangeText={(value: string): void => setEmail(value)}
          />
          <TextInput
            autoCompleteType="password"
            value={password}
            onChangeText={(value: string): void => setPassword(value)}
          />
          <Button onPress={(): Promise<void> => register(email, password)} title="Register" />
        </View>
      ) : null}

      {isLoggedIn ? <Button onPress={logOut} title="Logout" /> : null}
      <ErrorBoundary>
        <Button
          onPress={(): void => {
            throw new Error('Crashed!');
          }}
          title="Crash me"
        />
      </ErrorBoundary>

      <Button onPress={(): void => navigation.push('Profile')} title="Profile" />
    </>
  );
};
