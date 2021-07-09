// add middlewares here related to projects
// const projectRouter = require('./projects-router')
// const actionRouter = require('../actions/actions-router');
const Projects = require('./projects-model');

const validateCompleted = (req, res, next) => {
    if(!req.body.hasOwnProperty('completed')){ //eslint-disable-line
        next({
            status: 400
        })
    } else{
        next()
    }
}

const validateProjectId = async (req, res, next) => {
    try{
        const {id} = req.params;
        const project = await Projects.get(id)
        if(project){
            req.project = project
            next()
        } else{
            next({
                status: 404,
                message: "validate project id"
            })
        }
    }catch (err){
        next(err)
    }
}

const validateProjectBody = (req, res, next) => {
    if(!req.body.name || !req.body.description){
        next({
            status: 400
        })
    } else{
        next()
    }
}

const notFound = (req, res) => {
    res.status(404).json({
      message: 'not found, sorry!'
    })
  }
  
  const errorHandling = (err, req, res, next) => { // eslint-disable-line
    const status = err.status || 500
    res.status(status).json({
      message: err.message,
    })
  }

  module.exports = {
    notFound,
    errorHandling,
    validateProjectId,
    validateProjectBody,
    validateCompleted
  }