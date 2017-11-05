import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { audioReducer as audio } from './audioReducer';
import { authenticationReducer as authentication } from './authenticationReducer';
import { autocompleteReducer as autocomplete } from './autoCompleteReducer';

const appReducer = combineReducers({
    audio, routing, authentication, autocomplete
});

export const reducers = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}