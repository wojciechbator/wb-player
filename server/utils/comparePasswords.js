const bcrypt = require('bcrypt');

const comparePasswords = (incomingPassword, hashedPassword) => {
    return bcrypt.compareSync(incomingPassword, hashedPassword);
}

module.exports = comparePasswords;