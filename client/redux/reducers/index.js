import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { webAudioReducer as webAudio } from 'react-redux-webaudio';
import { audioReducer as audio } from './audioReducer';
import { autocompleteReducer as autocomplete } from './autoCompleteReducer';
import { playerReducer as player } from './playerReducer';

export const reducers = combineReducers({
    audio, routing, webAudio, player, autocomplete
});
