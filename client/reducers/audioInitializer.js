import { AUDIO_CONTEXT_INIT } from '../audio/audioInitializer/actions';

const audioInitializer = (state = {}, action) => {
    switch (action.type) {
        case AUDIO_CONTEXT_INIT:
            return {
                audioContext: action.audioContext
            };
        default:
            return state;
    }
}

export default audioInitializer;