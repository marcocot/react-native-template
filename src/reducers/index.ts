import { combineReducers } from '@reduxjs/toolkit';
import { reducer as userReducer } from '@app/features/login';

export const rootReducer = combineReducers({
  user: userReducer,
});
