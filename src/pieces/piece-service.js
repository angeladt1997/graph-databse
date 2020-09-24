const jwt = require('jsonwebtoken')
const config = require('../config')


const PieceService = {
  getPiecesWithUser(db, user) {
    const pieces = db('assignedpieces')
      .where({ user_id: user.id })
      return (
        pieces
      );
  },
  getPiecesWithUserAndId(db, user, assignedpieces_id) {
    const ship = db('assignedpieces')
      .where({ user_id: user.id, id: assignedpieces.id })
      .first()
      return (
        ship
      );
  },
  deletePiecesByUserAndId(db, user, assignedpieces_id) {
    return db('user_ships')
    .where({ user_id: user.id, id: parseInt(assignedpieces, 10) })
    .delete()
  },

  createPieceForUser(db, user) {
    return db('assignedpieces').insert({
      user_id: user.id, 
      piece_name: 'New Piece', 
    })
    .returning('*')
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
}

module.exports = PieceService