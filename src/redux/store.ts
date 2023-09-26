import {configureStore} from '@reduxjs/toolkit';
import userSlice from './states/user';
export interface User {
  id?: string;
  email: string;
  username: string;
  createdAt: string;
  name?: string;
  photo?: string;
  hashedPassword?: string;
  googleId?: string;
  token?: string;
  language: string;
}

export interface AppStore {
  user: User;
}
export const store = configureStore<AppStore>({
  reducer: {
    user: userSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
