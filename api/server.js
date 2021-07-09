const express = require('express');
const projectRouter = require('./projects/projects-router')
const actionRouter = require('./actions/actions-router');

const {
    notFound,
    errorHandling
} = require('./projects/projects-middleware')




const server = express();
server.use(express.json())


server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.use('*', notFound)

server.use(errorHandling)

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
