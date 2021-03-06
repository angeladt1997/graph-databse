jwt = require('jsonwebtoken')
const config = require('../config')


const PieceService = {
  getPiecesWithUser(db, user) {
    const pieces = db('assignedpieces')
      .where({ user_id: user.id })
      return (
        pieces
      );
  },
  getPiecesWithUserAndId(db, graphusers, assignedpieces) {
    const pieces = db('assignedpieces')
      .where({ user_id: graphusers.id, id: assignedpieces.id })
      .first()
      return (
        pieces
      );
  },
  // deletePiecesByUserAndId(db, user, assignedpieces) {
  //   return db('user_pieces')
  //   .where({ user_id: user.id, id: parseInt(assignedpieces, 10) })
  //   .delete()
  // },

  // createPieceForUser(db, user) {
  //   return db('assignedpieces').insert({
  //     user_id: user.id, 
  //     assignedpieces_piece: 'New Piece', 
  //   })
  //   .returning('*')
  // },
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