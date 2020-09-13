const xss = require('xss')

const StepsService = {
  getById(db, id) {
    return db
      .from('piecesteps AS stp')
      .select(

        'stp.title',
        '.stp_content',

        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                  usr.title,
                  usr.person
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'graphusers AS usr',
        'stp.user_id',
        'usr.id',
      )
      .where('stp.id', id)
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
        user_name: graphuser.title,
        full_name: graphuser.person,
      },
    }
  }
}

module.exports = StepsService;