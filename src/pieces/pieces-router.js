const express = require('express')
const piecesService = require('./pieces-service')
const { requireAuth } = require('../middleware/basic-auth')
const pieceRouter = express.Router()

piecesRouter
  .route('/')
  .get((req, res, next) => {
    PiecesService.getAllPieces(req.app.get('db'))
      .then(pieces => {
        res.json(PiecesService.serializePieces(pieces))
      })
      .catch(next)
  })
piecesRouter
  .route('/:piece_id')
  .all(requireAuth)
  .all(checkPieceExists)
  .get((req, res) => {
    res.json(PieceService.serializePiece(res.piece))
  })

piecesRouter.route('/:pieces_id/steps/')
  .all(checPieceExists)
  .all(requireAuth)
  .get((req, res, next) => {
    PiecesService.getStepsForPiece(
      req.app.get('db'),
      req.params.piece_id
    )
      .then(steps => {
        res.json(PiecesService.serializePieceSteps(steps))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkPieceExists(req, res, next) {
  try {
    const piece = await PiecesService.getById(
      req.app.get('db'),
      req.params.piece_id
    )

    if (!piece)
      return res.status(404).json({
        error: `Piece Does Not Exist`
      })

    res.piece = piece
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = piecesRouter