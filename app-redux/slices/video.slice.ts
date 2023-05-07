import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as FileSystem from 'expo-file-system';

export const CACHE_VIDEO = createAsyncThunk(
  'video/cache',
  async (uri: string) => {
    const fileName = uri.split('/').pop();
    const filePath = FileSystem.cacheDirectory + fileName;
    const videoObject = await FileSystem.getInfoAsync(filePath);
    if (!videoObject.exists) {
      await FileSystem.downloadAsync(uri, filePath);
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    uri: '',
  },
  reducers: {
    setVideoURI: (state, action) => {
      state.uri = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CACHE_VIDEO.fulfilled, (state, action) => {
      // Handle successful cache
    });
    builder.addCase(CACHE_VIDEO.rejected, (state, action) => {
      // Handle cache error
    });
  },
});

export const { setVideoURI } = videoSlice.actions;
export default videoSlice.reducer;
