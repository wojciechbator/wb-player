import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import audioReducer from './audioReducer';

export const reducers = combineReducers({
    audio: audioReducer,
    routing: routerReducer
});
