const mongoose = require('mongoose');

class Preset extends mongoose.Schema {
    constructor() {
        super({
            name: {
                type: String,
                unique: true
            },
            currentChain: [{}],
            user: String
        });
    }
}

module.exports = mongoose.model('presets', new Preset());