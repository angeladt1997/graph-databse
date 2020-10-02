  
const express = require('express')
const AuthService = require('./auth-service')
//const { requireAuth } = require('../middleware/jwt-auth')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter



  .post('/login', jsonBodyParser,(req, res, next) => {
    
    const { username, password } = req.body
    const loginUser = { username, password }
    console.log({username, password})

    for (const [key, value] of Object.entries(loginUser)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })}
    }

   
 
    AuthService.getUserWithUserName(
      req.app.get('db'),
      loginUser.username
    )
      .then(graphusers => {
        if (!graphusers)
          return res.status(400).json({
            error: 'Incorrect username or password',
          })

        return AuthService.comparePasswords(loginUser.password, graphusers.password)
          .then(compareMatch => {
            console.log("Inside password compare", compareMatch);

            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect username or password',
              })

            const sub = graphusers.username
            const payload = { user_id: graphusers.id }
            // res.send({
            //   authToken: AuthService.createJwt(sub, payload),
            // })
          })
      })
      .catch(next)
  })

authRouter.post('/refresh', (req, res) => {
  const sub = req.user.username
  const payload = { user_id: req.graphusers.id }
  res.send( 'all good'
   // authToken: AuthService.createJwt(sub, payload),
  )
})

module.exports = authRouter

// const express = require('express')
// const AuthService = require('./auth-service')

// const authRouter = express.Router()
// const jsonBodyParser = express.json()

// authRouter
//   .post('/login', jsonBodyParser, (req, res, next) => {
//     const { username, password } = req.body
//     const loginUser = { username, password }

//     for (const [key, value] of Object.entries(loginUser))
//       if (value == null)
      
//         return res.status(400).json({
//           error: `Missing '${key}' in request body`
//         })
//         console.log('reached code')        

//     AuthService.getUserWithUserName(
//       req.app.get('db'),
//       loginUser.username
//     )
//       .then(graphusers => {
//         if (!graphusers)
//           return res.status(400).json({
//             error: 'Incorrect username or password',
//           })

//         return AuthService.comparePasswords(loginUser.password, graphusers.password)
//           .then(compareMatch => {
//             if (!compareMatch)
//               return res.status(400).json({
//                 error: 'Incorrect username or password',
//               })

//             const sub = graphusers.username
//             const payload = { user_id: graphusers.id }
//             res.send({
//               authToken: AuthService.createJwt(sub, payload),
//             })
//           })
//       })
//       .catch(next)
//   })

// module.exports = authRouter