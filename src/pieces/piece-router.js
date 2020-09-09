const express = require('express')
const path = require('path')
const PiecesService = require('./piece-service')
const { requireAuth } = require('../middleware/jwt-auth')

const piecesRouter = express.Router()
const jsonBodyParser = express.json()

piecesRouter
  .route('/piece')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { graph_pieces, text } = req.body
    const pieces = { assignedPieces, text }

    for (const [key, value] of Object.entries(pieces))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newPiece.user_id = req.user.id

    piecesService.insertPiece(
      req.app.get('db'),
      `newPiece`
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${Pieces.id}`))
          .json(stepsService.serializeSteps(steps))
      })
      .catch(next)
    })

module.exports = piecesRouter