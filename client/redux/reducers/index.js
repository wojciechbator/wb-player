import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { webAudioReducer as webAudio } from 'react-redux-webaudio';
import { audioReducer as audio } from './audioReducer';
import { autocompleteReducer as autocomplete } from './autoCompleteReducer';
import { outputReducer as output } from './outputReducer';

export const reducers = combineReducers({
    audio, routing, webAudio, output, autocomplete
});
