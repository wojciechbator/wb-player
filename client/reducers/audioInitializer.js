import { AUDIO_CONTEXT_INIT } from '../audio/audioInitializer/types';

const initialState = {
    audioContext: null
}

const audioInitializer = (state = initialState, action) => {
    switch (action.type) {
        case AUDIO_CONTEXT_INIT:
            return Object.assign({}, state, {
                audioContext: action.audioContext
            });
        default:
            return state;
    }
}

export default audioInitializer;