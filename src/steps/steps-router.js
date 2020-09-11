const express = require('express')
const path = require('path')
const StepsService = require('./steps-service')
const { requireAuth } = require('../middleware/jwt-auth')

const stepsRouter = express.Router()
const jsonBodyParser = express.json()

stepsRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { article_id, text } = req.body
    const newStep = { piece_id, content }

    for (const [key, value] of Object.entries(newStep))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    newStep.user_id = req.user.id

    StepsService.insertStep(
      req.app.get('db'),
      newStep
      .then(step => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${step.id}`))
          .json(StepsService.serializeStep(step))
      })
      .catch(next)
    })

module.exports = stepsRouter