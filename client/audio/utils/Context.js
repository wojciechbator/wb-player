const context = new (window.AudioContext || window.webkitAudioContext)();
const analyser = context.createAnalyser();

const Context = {

    getContext() {
        return context;
    },

    getAnalyser() {
        return analyser;
    },

    decodeAudio() {
        context.decodeAudioData(data).then((decodedData) => {

        });
    }
}

export default Context;