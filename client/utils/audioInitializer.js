import { initializeAudioContext } from '../redux/actions';

const audioInitializer = (store) => {
    store.dispatch(initializeAudioContext(new AudioContext()));
}

export default audioInitializer;