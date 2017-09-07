import store from '../redux/store';
import { initializeAudioContext, storeInputStream } from '../redux/actions/audioActions';

export const audioInitializer = () => {
    const audioContext = new AudioContext();
    store.dispatch(initializeAudioContext(audioContext));
    captureAudio(audioContext);
}

export const captureAudio = (audioContext) => {
    if (!navigator.getUserMedia)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true },
            (stream) => {
                const inputStream = audioContext.createMediaStreamSource(stream);
                store.dispatch(storeInputStream(inputStream));
            },
            (error) => {
                alert('Error capturing audio.');
            }
        );
    } else { 
        alert('getUserMedia not supported in this browser.'); 
    }
}