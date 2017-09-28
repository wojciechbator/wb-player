import { Observable } from 'rxjs';

export const observeAudioChain = (audioChain) => {
    return Observable.from(audioChain);
}