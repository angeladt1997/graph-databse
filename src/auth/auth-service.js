const AuthService = {
    getUserWithUserName(db, userName) {
      return db('graphUsers')
        .where({ userName })
        .first()
    },
    parseBasicToken(token) {
      return Buffer
        .from(token, 'base64')
        .toString()
        .split(':')
    },
  }
  
  module.exports = AuthService