import { combineReducers } from 'redux';
import videoReducer from './slices/video.slice';

export const rootReducer = combineReducers({ video: videoReducer });
