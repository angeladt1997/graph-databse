const xss = require('xss')

const PiecesService = {
  getAllPieces(db) {
    return db
      .from('assignedpieces')
      .select(
        'assignedpieces.userName',
        'assignedpieces.piece',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'userName', graphusers.userName,
              'person', graphusers.person
            )
          ) AS "user"`
        ),
      )
      .leftJoin(
        'piecesteps',
        'piecesteps.id',
        'graphusers.id',
      )
      .leftJoin(
        'graphusers',
        'piecesteps.graphusers_id',
        'graphusers.id',

      )
      .groupBy('assignedpieces.id', 'graphusers.id')
  },

  getById(db, id) {
    return PiecesService.getAllPieces(db)
      .where('pcs.id', id)
      .first()
  },

  getStepsForPieces(db, pieces_id) {
    return db
      .from('piecesteps')
      .select(
        'piecesteps.title',
        'piecesteps.content',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT * FROM (
                  graphusers.user,
                  graphusers.person
              ) graphusers)
            )
          ) AS "user"`
        )
      )
      .where('piecesteps.piece_id', piece_id)
      .leftJoin(
        'graphusers',
      )
      .groupBy('piecesteps.id', 'graphusers.id')
  },

  serializePiece(piece) {
    const { assignedpieces } = piece
    return {
      id: assignedpieces.id,
      user: xss(assignedpieces.user),
      piece: xss(assignedpieces.piece),
      number_of_steps: Number(piecesteps.content) || 0,
      piece: {
        id: assignedPieces.id,
        user_name: graphuser.title,
        full_name: graphuser.person
        },
    }
  },

  serializePieceSteps(steps) {
    const { graphuser } = steps
    return {
      id: piecesteps.id,
      piece_id: steps.piece_id,
      content: xss(steps.content),
      user: {
        id: graphuser.id,
        user_name: graphuser.title,
        full_name: graphuser.person,
      },
    }
  },
}

module.exports = PiecesService
