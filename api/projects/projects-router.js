// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {
    notFound, //eslint-disable-line
    errorHandling, //eslint-disable-line
    validateProjectId,
    validateProjectBody,
    validateCompleted
} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get()
        .then(array => {
            res.status(200).json(array)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req,res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProjectBody, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.put('/:id',  validateCompleted, validateProjectId, validateProjectBody,  (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(updatedProj => {
            res.status(200).json(updatedProj)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(res => {
            res.status(200)
        })
        .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})


module.exports = router
