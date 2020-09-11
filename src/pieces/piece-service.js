const xss = require('xss')

const PiecesService = {
  getAllPieces(db) {
    return db
      .from('choreograph_assignedpieces AS pcs')
      .select(
        'pcs.id',
        'pcs.userName',
        'pcs.piece',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.userName,
              'full_name', usr.person,
            )
          ) AS "user"`
        ),
      )
      .leftJoin(
        'choreograph_piecesteps AS stp',
        'pcs.id',
        'usr.id',
      )
      .leftJoin(
        'choreograph_graphusers AS usr',
        'pcs.usr_id',
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
      .from('choreograph_piecesteps AS stp ')
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
                  usr.person
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('stp.piece_id', piece_id)
      .leftJoin(
        'choreograph_graphusers AS usr',
        'stp.user_id',
        'usr.id',
      )
      .groupBy('stp.id', 'usr.id')
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
