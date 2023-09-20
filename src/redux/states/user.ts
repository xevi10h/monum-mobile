import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {User} from '../store';

const initialState: User = {
  id: '',
  email: '',
  username: '',
  createdAt: new Date().toISOString(),
  name: '',
  photo: '',
  hashedPassword: '',
  googleId: '',
  token: '',
  language: 'en-US',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('authToken', action.payload);
    },
    removeAuthToken: state => {
      state.token = '';
      AsyncStorage.removeItem('authToken');
    },
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.createdAt = action.payload.createdAt;
      state.name = action.payload.name;
      state.photo = action.payload.photo;
      state.hashedPassword = action.payload.hashedPassword;
      state.googleId = action.payload.googleId;
      state.language = action.payload.language;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setAuthToken, removeAuthToken, setUser} = userSlice.actions;

export default userSlice.reducer;
