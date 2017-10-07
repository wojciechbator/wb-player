import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { recorderReducer as recorder } from 'react-recorder-redux';
import { webAudioReducer as webAudio } from 'react-redux-webaudio';
import { audioReducer as audio } from './audioReducer';
import { autocompleteReducer as autocomplete } from './autoCompleteReducer';

export const reducers = combineReducers({
    audio, routing, recorder, webAudio, autocomplete
});
