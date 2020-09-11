const xss = require('xss')

const StepsService = {
  getById(db, id) {
    return db
      .from('choreograph_piecesteps AS stp')
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
                  usr.person
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'choreograph_graphusers AS usr',
        'stp.user_id',
        'usr.id',
      )
      .where('stp.id', id)
      .first()
  },

  insertStep(db, newStep                                                                                                                                                  ) {
    return db
      .insert(newStep)
      .into('choreograph_piecesteps')
      .returning('*')
      .then(([piecesteps]) => piecesteps)
      .then(piecesteps =>
        StepsService.getById(db, step.id)
      )
  },

  serializeStep(step) {
    const { user } = step
    return {
      id: piecesteps.id,
      title: xss(piecesteps.title),
      content: piecesteps.content,
      assignedpieces_id: piecesteps.assignedpieces_id,
      user: {
        id: user.id,
        user_name: graphuser.title,
        full_name: graphuser.person,
      },
    }
  }
}

module.exports = StepsService;