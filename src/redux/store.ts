import {Action, configureStore} from '@reduxjs/toolkit';
import thunk, {ThunkAction} from 'redux-thunk';
import userSlice from './states/user';
import mediasSlice from './states/medias';
import IUser from '../shared/interfaces/IUser';
import IMedias from '../shared/interfaces/IMedias';
import managerSlice, {IManager} from './states/manager';

export interface AppStore {
  user: IUser;
  medias: IMedias;
  manager: IManager;
}
export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice,
    medias: mediasSlice,
    manager: managerSlice,
  },
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
