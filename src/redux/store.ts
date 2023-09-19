import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from './states/user';
export interface User {
  id?: string;
  email: string;
  username: string;
  createdAt: Date;
  name?: string;
  photo?: string;
  hashedPassword?: string;
  googleId?: string;
  token?: string;
}

export interface AppStore {
  user: User;
}
export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
  },
});
