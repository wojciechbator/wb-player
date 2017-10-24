const mongoose = require('mongoose');

class Preset extends mongoose.Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            gain: {
                type: Number,
                required: true
            },
            delay: {
                type: Boolean,
                required: true
            },
            distortion: {
                type: Number,
                required: true
            },
            bass: {
                type: Number,
                required: true
            },
            middle: {
                type: Number,
                required: true
            },
            treble: {
                type: Number,
                required: true
            }
        });
    }
}

module.exports = mongoose.model('presets', new Preset());