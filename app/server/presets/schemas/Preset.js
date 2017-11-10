const mongoose = require('mongoose');

class Preset extends mongoose.Schema {
    constructor() {
        super({
            name: {
                type: String,
                unique: true
            },
            gain: Number,
            delay: Boolean,
            distortion: Number,
            bass: Number,
            middle: Number,
            treble: Number,
            currentChain: [String],
            user: String
        });
    }
}

module.exports = mongoose.model('presets', new Preset());