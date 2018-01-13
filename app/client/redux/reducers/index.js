import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {audioReducer as audio} from './audioReducer';
import {authenticationReducer as authentication} from './authenticationReducer';
import {presetReducer as preset} from './presetReducer';
import {socketReducer as socket} from './socketReducer';

const appReducer = combineReducers({
    audio, routing, authentication, preset, socket
});

export const reducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        sessionStorage.clear();
        state = undefined;
    }
    return appReducer(state, action);
};