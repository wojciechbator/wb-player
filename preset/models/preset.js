const mongoose = require('mongoose');

class Preset extends mongoose.Schema {
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            values: {
                gain: {
                    type: Number,
                    required: true
                },
                reverb: {
                    type: Number,
                    required: true
                },
                delay: {
                    type: Number,
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
            }
        });
    }
}

module.exports = mongoose.model('preset', new Preset());