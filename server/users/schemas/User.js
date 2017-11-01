const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

    comparePassword(password) {
        return bcrypt.compareSync(password, this.hashedPassword);
    }
}

module.exports = mongoose.model('users', new User());