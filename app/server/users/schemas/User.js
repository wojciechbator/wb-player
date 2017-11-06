const mongoose = require('mongoose');

class User extends mongoose.Schema {
    constructor() {
        super({
            fullName: {
                type: String,
                trim: true,
                required: true
            },
            email: {
                type: String,
                unique: true,
                trim: true,
                required: true
            },
            hashedPassword: {
                type: String,
                required: true
            },
            created: {
                type: Date,
                default: Date.now
            }
        });
    }
}

module.exports = mongoose.model('users', new User());