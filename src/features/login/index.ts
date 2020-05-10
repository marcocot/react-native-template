import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import { AppThunk } from '@app/store';

export type UserType = Pick<FirebaseAuthTypes.User, 'uid' | 'displayName'>;

export interface UserState {
  currentUser: UserType | null;
}

const initialState: UserState = { currentUser: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state: UserState, action: PayloadAction<UserType>): void => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;

export const login = (user: UserType): AppThunk => async (dispatch): Promise<void> => {
  dispatch(setCurrentUser(user));
  await Promise.all([crashlytics().setUserId(user.uid)]);
  analytics().logLogin({ method: user.uid });
  crashlytics().log('user logged');
};

export const { reducer } = userSlice;
