const xss = require('xss')

const PiecesService = {
  getAllPieces(db) {
    return db
      .from('choreograph_assignedPieces AS pcs')
      .select(
        'pcs.id',
        'pcs.user',
        'pcs.piece',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'full_name', usr.full_name,
              'nickname', usr.nickname,
              'date_created', usr.date_created,
              'date_modified', usr.date_modified
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'choreograph_pieceSteps AS stp',
        'pcs.id',
        'stp.pcs_id',
      )
      .leftJoin(
        'choreograph_graphUsers AS usr',
        'pcs._id',
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
      .from('choreograph_pieceSteps AS stp ')
      .select(
        'stp.id',
        'stp.title',
        'stp.content',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user,
                  usr.full
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('stp.piece_id', piece_id)
      .leftJoin(
        'choreograph_graphUsers AS usr',
        'stp.user_id',
        'usr.id',
      )
      .groupBy('stp.id', 'usr.id')
  },

  serializePiece(piece) {
    const { assignedPieces } = piece
    return {
      id: assignedPieces.id,
      user: xss(assignedPieces.user),
      piece: xss(assignedPieces.piece),
      number_of_steps: Number(pieceSteps.content) || 0,
      piece: {
        id: assignedPieces.id,
        user_name: graphUser.title,
        full_name: graphUser.full
        },
    }
  },

  serializePieceSteps(steps) {
    const { user } = steps
    return {
      id: pieceSteps.id,
      piece_id: steps.piece_id,
      content: xss(steps.content),
      user: {
        id: graphUser.id,
        user_name: graphUser.title,
        full_name: graphUser.full,
      },
    }
  },
}

module.exports = PiecesService
