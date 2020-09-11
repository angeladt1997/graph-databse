const express = require('express')
const PiecesService = require('./piece-service')
const { requireAuth } = require('../middleware/jwt-auth')

const piecesRouter = express.Router()

piecesRouter
  .route('/')
  .get((req, res, next) => {
    PiecesService.getAllPieces(req.app.get('db'))
      .then(pieces => {
        res.json(pieces.map(PiecesService.serializePiece))
      })
      .catch(next)
  })

piecesRouter
  .route('/:assignedPieces_id')
  .all(requireAuth)
  .all(checkAssignedPiecesExists)
  .get((req, res) => {
    res.json(PiecesService.serializePiece(res.assignedpieces))
  })

piecesRouter.route('/:AssignedPieces_id/steps/')
  .all(requireAuth)
  .all(checkAssignedPiecesExists)
  .get((req, res, next) => {
    PiecesService.getStepsForPieces(
      req.app.get('db'),
      req.params.pieces_id
    )
      .then(steps => {
        res.json(steps.map(PiecesService.serializePieceSteps))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkAssignedPiecesExists(req, res, next) {
  try {
    const article = await PiecesService.getById(
      req.app.get('db'),
      req.params.assignedpieces_id
    )

    if (!assignedpieces)
      return res.status(404).json({
        error: `Piece doesn't exist`
      })

    res.assignedpieces = assginedpieces
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = piecesRouter