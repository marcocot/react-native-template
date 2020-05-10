import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { rootReducer } from '@app/reducers';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
