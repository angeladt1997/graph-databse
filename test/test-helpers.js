const bcrypt = require('bcryptjs')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: '2029-01-22T16:28:32.615Z',
    },
  ]
}

function makeUsersArray(users) {
  return [
    {
      id: 1,
      username: 'grapherOne',
      password: 'passwordOne',
    },
    {
      id: 2,
      username: 'grapherTwo',
      password: 'passwordTwo',
    },
    {
      id: 3,
      username: 'grapherThree',
      password: 'passwordThree',
    },
    {
      id: 4,
      username: 'grapherFour',
      password: 'passwordFour',
    },
  ]
}

function makeMaliciousThing(user) {
  const maliciousThing = {
    id: 911,
    image: 'http://placehold.it/500x500',
    date_created: new Date().toISOString(),
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    user_id: user.id,
    content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
  }
  const expectedThing = {
    ...makeExpectedThing([user], maliciousThing),
    title: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousThing,
    expectedThing,
  }
}


function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      graphusers,
      RESTART IDENTITY CASCADE`
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('graphusers').insert(preppedUsers)
    .then(() =>
      db.raw(
        `SELECT setval('graphusers_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedChoreographTables(db, graphusers, assignedpieces, piecesteps = []) {
  return db.transaction(async trx => {
    await seedUsers(trx, graphusers)
    await trx.into('assignedpieces').insert(piecesteps)
    await trx.raw(
      `SELECT setval('graphusers_id_seq', ?)`,
      [graphusers[graphusers.length - 1].id],
    )
  })
}


function seedMaliciousChoreograph(db, graphusers, assignedpieces) {
  return seedUsers(db, [graphusers])
    .then(() =>
      db
        .into('graphusers')
        .insert([graphusers])
    )
}


function makeAuthHeader(user) {
  const token = Buffer.from(`${graphusers.username}:${graphusers.password}`).toString('base64')
  return `Basic ${token}`
}

module.exports = {
  makeUsersArray,
  
  makeMaliciousThing,

  cleanTables,
  seedGraphTables,
  seedMaliciousChoreograph,
  seedUsers
}