import * as types from './types';
import * as actions from './actions';

describe('actions', () => {
    it('should create an action to initialize audio context', async () => {
        const audioContext = new AudioContext();
        const expectedAction = {
            type: types.AUDIO_CONTEXT_INIT,
            audioContext
        }
        expect(actions.initializeAudioContext()).toEqual(expectedAction);
    });
});