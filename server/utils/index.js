const bcrypt = require('bcrypt')

const comparePasswords = (incomingPswd, hashedPswd) => {
  return bcrypt.compareSync(incomingPswd, hashedPswd)
}

const isRequestAuthenticated = (incomingToken, validToken) => {
  return incomingToken === validToken
}

module.exports = {comparePasswords, isRequestAuthenticated}