const bcrypt = require('bcrypt-nodejs');

const comparePasswords = (incomingPassword, hashedPassword) => {
  return bcrypt.compareSync(incomingPassword, hashedPassword);
}

const isRequestAuthenticated = (incomingToken, validToken) => {
  return incomingToken === validToken;
}

module.exports = {comparePasswords, isRequestAuthenticated}