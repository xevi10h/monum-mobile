import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {User} from '../store';

const initialState: User = {
  id: '',
  email: '',
  username: '',
  createdAt: new Date(),
  name: '',
  photo: '',
  hashedPassword: '',
  googleId: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthToken: (state, action) => {
      console.log('setAuthToken slice');
      console.log('state', state);
      console.log('action', action);
      state.token = action.payload.token;
      AsyncStorage.setItem('authToken', action.payload.authToken);
    },
    removeAuthToken: state => {
      state.token = '';
      AsyncStorage.removeItem('authToken');
    },
  },
});
