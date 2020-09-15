const xss = require('xss')

const StepsService = {
  getById(db, id) {
    return db
      .from('piecesteps')
      .select(

        'piecesteps.title',
        'piecesteps.content',

        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                  graphuser.userName
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'graphusers',
        'stp.graphusers_id',
        'graphusers.id',
      )
      .where('piecesteps.id', id)
      .first()
  },

  insertStep(db, newStep                                                                                                                                                  ) {
    return db
      .insert(newStep)
      .into('piecesteps')
      .returning('*')
      .then(([piecesteps]) => piecesteps)
      .then(piecesteps =>
        StepsService.getById(db, piecesteps.id)
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
        user_name: graphusers.userName

      },
    }
  }
}

module.exports = StepsService;