require('dotenv').config();
const express = require('express');
 const morgan = require('morgan');
 const cors = require('cors');
 const helmet = require('helmet');
 const { NODE_ENV } = require('./config');
 const authRouter = require('./auth/auth-router');
 const usersRouter = require('./users/users-router');
 const pieceRouter = require('./pieces/piece-router');

 const app = express()


const morganOption = (NODE_ENV === 'production')
   ? 'tiny'
   : 'common';
app.use(morgan(morganOption))

app.use(helmet())
app.use(cors())


 app.use('/api/auth', authRouter)
 app.use('/api/graphusers', usersRouter)
 app.use('/api/piece', pieceRouter)


const epStart = '/';
 const startupGreet = 'Let\'s get graphing!';
 app.get(epStart, (req, res) => {
  res.send(startupGreet)
 })

 app.use(function errorHandler(error, req, res, next) {
   let response;
   if (NODE_ENV === 'production') {
     response = { error: { message: "server error" } };
   } else {
  
     response = { error };
  }
  res.status(500).json(response);
 });

 module.exports = { app, epStart, startupGreet }


