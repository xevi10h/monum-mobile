import {createSlice} from '@reduxjs/toolkit';

export interface IManager {
  placeDetailExpanded: boolean;
  place: any;
  placeMediaExpanded: boolean;
  placeMediaBubble: boolean;
  placeMedia: any;
}

const initialState: IManager = {
  placeDetailExpanded: false,
  place: null,
  placeMediaExpanded: false,
  placeMediaBubble: false,
  placeMedia: null,
};

export const managerSlice = createSlice({
  name: 'manager',
  initialState: initialState,
  reducers: {
    setPlaceDetailExpanded: (state, action) => {
      state.placeDetailExpanded = action.payload;
    },
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    setPlaceMediaExpanded: (state, action) => {
      state.placeMediaExpanded = action.payload;
    },
    setPlaceMediaBubble: (state, action) => {
      state.placeMediaBubble = action.payload;
    },
    setPlaceMedia: (state, action) => {
      state.placeMedia = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPlaceDetailExpanded,
  setPlace,
  setPlaceMediaExpanded,
  setPlaceMediaBubble,
  setPlaceMedia,
} = managerSlice.actions;

export default managerSlice.reducer;
