// add middlewares here related to actions
const Actions = require('./actions-model')

const validateActionId = (req,res,next) => {
    Actions.get(req.params.id)
        .then(action => {
            if(action){
                req.action = action
                next()
            }
            else{
                next({
                    status: 404
                })
            }
        })
        .catch(next)
}

const validateNotesDescProjId = (req, res, next) => {
    if(!req.body.notes || !req.body.description || !req.body.project_id){
        next({
            status: 400
        }) 
    }
    else{
        next()
    }
}

// const validateActionId = (req, res, next) => {
//     Actions.get(req.params.id)
//         .then(action => {
//             if(!action){
//                 next({
//                     status: 404
//                 })
//             } else {
//                 next()
//             }
//         })
//         .catch(next)
// }


module.exports = {
    validateActionId,
    validateNotesDescProjId
}
