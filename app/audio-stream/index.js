const LineIn = require('line-in');
const Speaker = require('speaker');

const input = new LineIn();
const output = new Speaker({
    channels: 2,
    bitDepth: 16,
    sampleRate: 44100
});

const streamData = () => {
    input.pipe(output);
}

module.exports = streamData;
