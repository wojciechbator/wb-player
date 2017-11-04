import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { audioReducer as audio } from './audioReducer';
import { authenticationReducer as authentication } from './authenticationReducer';
import { autocompleteReducer as autocomplete } from './autoCompleteReducer';

export const reducers = combineReducers({
    audio, routing, authentication, autocomplete
});
