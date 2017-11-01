import { initializeAudioContext, storeInputStream } from '../redux/actions/audioActions';

export const audioInitializer = (store) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext);
    store.dispatch(initializeAudioContext(audioContext));
    captureAudio(store, audioContext);
}

export const captureAudio = (store, audioContext) => {
    if (!navigator.mediaDevices.getUserMedia)
        navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia ||
    navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia;
    if (navigator.mediaDevices.getUserMedia) {
        return navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const inputStream = audioContext.createMediaStreamSource(stream);
            store.dispatch(storeInputStream(inputStream));
            return inputStream;
        }).catch(error => {
            alert('Error capturing audio.');
            return new Error(error);
        });
    } else { 
        alert('getUserMedia not supported in this browser.');
        return new Error();
    }
}