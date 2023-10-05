import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import IMedias from '../../shared/interfaces/IMedias';
import TrackPlayer, {RepeatMode, State} from 'react-native-track-player';
import {setupPlayerService} from '../../track-player/service';
import IMedia from 'src/shared/interfaces/IMedia';
import {AppThunk} from '../store';

const initialState: IMedias = {
  statePlayer: State.None,
  setupPlayer: false,
  currentMedia: null,
  mediaList: [],
};

export const mediasSlice = createSlice({
  name: 'medias',
  initialState: initialState,
  reducers: {
    setupPlayerSuccess: (state, action: PayloadAction<boolean>) => {
      state.setupPlayer = action.payload;
    },
    setNewCurrentMediaSuccess: (state, action: PayloadAction<number>) => {
      state.currentMedia = action.payload;
    },
    setNewCurrentMediaListSuccess: (
      state,
      action: PayloadAction<{medias: IMedia[]; position: number}>,
    ) => {
      state.mediaList = action.payload.medias;
      state.currentMedia = action.payload.position;
    },
    skipToNextSuccess: state => {
      if (typeof state.currentMedia === 'number') {
        state.currentMedia++;
      }
    },
    skipToPrevSuccess: state => {
      if (typeof state.currentMedia === 'number') {
        if (state.currentMedia > 0) {
          state.currentMedia--;
        } else {
          state.mediaList[state.currentMedia].position = 0;
        }
      }
    },
    restartCurrentMediaSuccess: state => {
      if (typeof state.currentMedia === 'number') {
        state.mediaList[state.currentMedia].position = 0;
      }
    },
    closePlayerSuccess: state => {
      state.currentMedia = null;
      state.mediaList = [];
    },
    updatePlayerState: (state, action: PayloadAction<State>) => {
      state.statePlayer = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setupPlayerSuccess,
  setNewCurrentMediaSuccess,
  setNewCurrentMediaListSuccess,
  skipToNextSuccess,
  skipToPrevSuccess,
  restartCurrentMediaSuccess,
  closePlayerSuccess,
  updatePlayerState,
} = mediasSlice.actions;

export const setupPlayer = (): AppThunk => async dispatch => {
  try {
    let isSetup = await setupPlayerService();
    dispatch(setupPlayerSuccess(isSetup));
  } catch (error) {
    console.error(error);
  }
};

export const setNewCurrentMedia =
  (payload: {medias: IMedia[]; position: number}): AppThunk =>
  async dispatch => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(
        payload.medias.map(media => ({
          id: media.id,
          url: media.audioUrl,
          title: media.title,
          artist: 'Xplorear',
        })),
      );
      await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      dispatch(
        setNewCurrentMediaListSuccess({
          medias: payload.medias,
          position: payload.position,
        }),
      );
      await TrackPlayer.play();
    } catch (error) {
      console.error(error);
    }
  };

export const skipToNext = (): AppThunk => async (dispatch, getState) => {
  try {
    const {medias} = getState();
    if (typeof medias.currentMedia === 'number') {
      if (medias.mediaList.length > 0) {
        if ((await TrackPlayer.getState()) !== State.Paused) {
          await TrackPlayer.pause();
        }
        await TrackPlayer.skipToNext();
        await TrackPlayer.seekTo(0);
        if ((await TrackPlayer.getState()) !== State.Playing) {
          await TrackPlayer.play();
        }
        const position = await TrackPlayer.getCurrentTrack();
        dispatch(setNewCurrentMediaSuccess(position || 0));
      } else {
        if ((await TrackPlayer.getState()) !== State.Paused) {
          await TrackPlayer.pause();
        }
        await TrackPlayer.seekTo(0);
        if ((await TrackPlayer.getState()) !== State.Playing) {
          await TrackPlayer.play();
        }
        dispatch(restartCurrentMediaSuccess());
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const skipToPrev = (): AppThunk => async (dispatch, getState) => {
  try {
    const {medias} = getState();
    if (typeof medias.currentMedia === 'number') {
      if (medias.mediaList.length > 0 && medias.currentMedia > 0) {
        if ((await TrackPlayer.getState()) !== State.Paused) {
          await TrackPlayer.pause();
        }
        await TrackPlayer.skipToPrevious();
        await TrackPlayer.seekTo(0);
        if ((await TrackPlayer.getState()) !== State.Playing) {
          await TrackPlayer.play();
        }
        dispatch(skipToPrevSuccess());
      } else {
        if ((await TrackPlayer.getState()) !== State.Paused) {
          await TrackPlayer.pause();
        }
        await TrackPlayer.seekTo(0);
        if ((await TrackPlayer.getState()) !== State.Playing) {
          await TrackPlayer.play();
        }
        dispatch(restartCurrentMediaSuccess());
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const restartCurrentMedia = (): AppThunk => async dispatch => {
  try {
    await TrackPlayer.seekTo(0);
    dispatch(restartCurrentMediaSuccess());
  } catch (error) {
    console.error(error);
  }
};

export const closePlayer = (): AppThunk => async (dispatch, getState) => {
  try {
    await TrackPlayer.reset();
    dispatch(closePlayerSuccess());
  } catch (error) {
    console.error(error);
  }
};

export const togglePlaying = (): AppThunk => async (dispatch, getState) => {
  try {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
    } else if (state === State.Paused) {
      await TrackPlayer.play();
    }
  } catch (error) {
    console.error(error);
  }
};

export default mediasSlice.reducer;
