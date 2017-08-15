const LineIn = require('line-in');
const Speaker = require('speaker');

const input = new LineIn();
const output = new Speaker({ signed: true });
// Some low level audio data processing

module.exports = {input, output};
