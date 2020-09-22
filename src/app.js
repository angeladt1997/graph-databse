require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const { NODE_ENV } = require('./config')
const piecesRouter = require('./pieces/piece-router')
const stepsRouter = require('./steps/steps-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const app = express()
const router = require

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))
app.use(cors())
app.use(helmet())

app.get('/', function (req, res) {
  res.render('index', {});
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api/steps', stepsRouter)
app.use('/api/pieces', piecesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app