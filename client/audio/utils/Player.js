import Context from './Context';

let audioSource;

const Player = {
    create(audioElement) {
        const context = Context.getContext();
        const analyser = Context.getAnalyser();

        if (!audioSource) {
            const source = context.createMediaElementSource(audioElement);
            source.connect(analyser);
            audioSource = source;
        }

        analyser.connect(context.destination);
    }
}

export default Player;