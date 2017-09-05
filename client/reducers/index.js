import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import audioInitializer from './audioInitializer';

export const reducers = combineReducers({
    audioInitializer,
    routing: routerReducer
});