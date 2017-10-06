import { Observable } from 'rxjs';

export const observeAudioChain = (audioChain) => {
    return Observable.from(audioChain);
}

export const pushAudioElement = (audioChain, element) => {
    audioChain.push(element);
}