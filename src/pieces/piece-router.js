const express = require('express')
const PieceService = require('./piece-service')
const { requireAuth } = require('../middleware/jwt-auth')
const stepList = require('./steps_lists')

const pieceRouter = express.Router()
const jsonBodyParser = express.json()



pieceRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    PieceService.getPiecesWithUser( 
      req.app.get('db'),
      req.user
      )
    .then(pieces => {
      res.status(200).json(pieces);
    })
  })
  .post(jsonBodyParser, (req, res, next) => {
    PieceService.createPieceForUser( 
      req.app.get('db'),
      req.user
      )
    .then(piece => {
      console.log(piece);
      res.status(200).json(piece[0]);
    })
  })

pieceRouter
  .route('/:piece_id')
  .all(requireAuth)
  .get((req, res, next) => {
    PieceService.getPiecesWithUserAndId( 
      req.app.get('db'),
      req.user, req.params.piece_id
      )
    .then(piece => {
      if(piece){
        const stepsForPiece = (piecestepsTitle) => {
          return {assignedpieces: piecesteps[piecestepsContent], 
          
      }
    }
      
  
}
})
pieceRouter
  .delete((req, res, next) => {
    PieceService.deletePieceByUserAndId( 
      req.app.get('db'),
      req.user, req.params.piece_id
      )
      .then(() =>
        res.status(200).json({message: 'ok'})
      )
  })


pieceRouter
  .route('/:piece_id')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { piecestepsTitle, piecestepsContent } = req.body
    
    PieceService.changePieceStep( 
      req.app.get('db'),
      req.params.piece_id, piecestepsTitle, piecestepsContent
    )

    .then(piece => {
      piece = piece[0]
      if(piece){
        piece[piecestepsTitle] = piecestepsContent
       
        }
    })
  })
})   
module.exports = pieceRouter; 