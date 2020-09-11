const xss = require('xss')

const StepsService = {
  getById(db, id) {
    return db
      .from('choreograph_pieceSteps AS stp')
      .select(
        'stp.id',
        'stp.title',
        '.stp_content',
        'stp.piece_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.title,
                  usr.full,

              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'choreograph_graphUsers AS usr',
        'stp.user_id',
        'usr.id',
      )
      .where('stp.id', id)
      .first()
  },

  insertStep(db, newStep                                                                                                                                                  ) {
    return db
      .insert(newStep)
      .into('choreograph_pieceSteps')
      .returning('*')
      .then(([pieceSteps]) => pieceSteps)
      .then(pieceSteps =>
        StepsService.getById(db, step.id)
      )
  },

  serializeStep(step) {
    const { user } = step
    return {
      id: pieceSteps.id,
      title: xss(pieceSteps.title),
      content: pieceSteps.content,
      assignedPieces_id: pieceSteps.assignedPieces_id,
      user: {
        id: user.id,
        user_name: graphUser.title,
        full_name: graphUser.full,
      },
    }
  }
}

module.exports = StepsService;