import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { recorderReducer as recorder } from 'react-recorder-redux';
import { audioReducer as audio } from './audioReducer';

export const reducers = combineReducers({
    audio, routing, recorder
});
