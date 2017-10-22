import { captureAudio } from './audioInitializer';

async function audioChain(audioChain, audioContext) {
    const inputStream = await captureAudio(audioContext);
    inputStream.connect(audioChain[0]);
    for (let i = 0; i < audioChain.length; i++) {
        audioChain[i + 1] ? audioChain[i].connect(audioChain[i + 1]) : audioChain[i].connect(audioContext.destination);
    }
}

export default audioChain;