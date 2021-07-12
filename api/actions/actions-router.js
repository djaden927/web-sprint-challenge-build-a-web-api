// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model') //eslint-disable-line
const {
    validateCompleted,
    notFound, //eslint-disable-line
    errorHandling //eslint-disable-line
} = require('../projects/projects-middleware')

const {
   validateActionId,
   validateNotesDescProjId
} = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Actions.get()
        .then(array => {
            res.status(200).json(array)
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateNotesDescProjId, (req, res, next) => {
    Actions.insert(req.body)
        .then(createdPost => {
            res.status(201).json(createdPost)
        })
        .catch(next)
})

router.put('/:id', validateCompleted, validateNotesDescProjId, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedPost => {
            res.status(200).json(updatedPost)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(res => {
            res.status(200)
        })
        .catch(next)
})







module.exports = router