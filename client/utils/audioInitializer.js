import { initializeAudioContext } from '../redux/actions/audioActions';

const audioInitializer = (store) => {
    store.dispatch(initializeAudioContext(new AudioContext()));
}

export default audioInitializer;