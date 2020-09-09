const xss = require('xss')
const Treeize = require('treeize')

const PiecesService = {
  getAllPieces(db) {
    return db
      .from('choreograph_assignedPieces AS pcs')
      .select(
        'pcs.id',
        'pcs.title',
        ...userFields,
        // db.raw(
        //   `count(DISTINCT rev) AS number_of_reviews`
        // ),
        // db.raw(
        //   `AVG(rev.rating) AS average_review_rating`
        // ),
      )
      .leftJoin(
        'piece_steps AS steps',
        'piece.id',
        'steps.piece_id',
      )
      .leftJoin(
        'choreograph_users AS usr',
        'pcs.user_id',
        'usr.id',
      )
      .groupBy('pcs.id', 'usr.id')
  },

  getById(db, id) {
    return PiecesService.getAllPieces(db)
      .where('pcs.id', id)
      .first()
  },

  getStepsForPieces(db, pieces_id) {
    return db
      .from('pieceSteps AS stp')
      .select(
        'stp.id',
        'stp.title',
        'stp.content',
        ...userFields,
      )
      .where('stp.piece_id', piece_id)
      .leftJoin(
        'graph_users AS usr',
        'stp.user_id',
        'usr.id',
      )
      .groupBy('stp.id', 'usr.id')
  },

  serializePieces(pieces) {
    return pieces.map(this.serializePiece)
  },

  serializePiece(Piece) {
    const pieceTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const pieceData = pieceTree.grow([ piece ]).getData()[0]

    return {
      id: pieceData.id,
      title: xss(piceData.title),
      user: thingData.user || {},
      number_of_steps: Number(pieceData.number_of_steps) || 0,
    }
  },

  serializePieceSteps(steps) {
    return steps.map(this.serializePieceSteps)
  },

  serializePieceSteps(steps) {
    const reviewTree = new Treeize()

    // Some light hackiness to allow for the fact that `treeize`
    // only accepts arrays of objects, and we want to use a single
    // object.
    const stepData = stepTree.grow([ step ]).getData()[0]

    return {
      id: stepData.id,
      title: stepData.title,
      content: stepData.content,
      piece_id: stepData.piece_id,
      user: stepData.user || {},
    }
  },
}

const userFields = [
  'usr.id AS user:id',
  'usr.user_name AS user:user_name',
  'usr.full_name AS user:full_name',
]

module.exports = PiecesService