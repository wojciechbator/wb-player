import Context from './Context';

let audioSource;

export default Player = {
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