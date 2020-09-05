const express = require('express')
const path = require('path')
const CommentsService = require('./comments-service')
const { requireAuth } = require('../middleware/jwt-auth')

const commentsRouter = express.Router()
const jsonBodyParser = express.json()

stepsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { graph_pieces, text } = req.body
    const steps = { graph_pieces, text }

    for (const [key, value] of Object.entries(steps))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newComment.user_id = req.user.id

    stepsService.insertStep(
      req.app.get('db'),
      newStep`
    )
      .then(comment => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${steps.id}`))
          .json(stepsService.serializeSteps(steps))
      })
      .catch(next)
    })

module.exports = stepsRouter