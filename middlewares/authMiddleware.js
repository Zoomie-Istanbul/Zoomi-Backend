const { Users, Favorites, Garages } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper.js')

const authenticate = (request, response, next) => {
    if (request.headers.access_token) {
        let userData = verifyToken(request.headers.access_token)
        if (userData.id && userData.username) {
            Users.findOne({
                where: {
                    id: userData.id,
                    username: userData.username
                }
            })   
            .then(data => {
                request.userData = userData
                next()
            })
            .catch(err => {
                next(err)
            })
        }else{
            next({code:400, msg: 'Invalid Token'})
        }
    }else{
        next({code:400, msg: 'Invalid Token'})
    }
}

const authorize = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
            email: request.userData.email
        }
    })
    .then(data => {
        if (data.id === request.userData.id) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorizeFavorites = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
            email: request.userData.email
        }
    })
    .then(data => {
        return Favorites.findOne({
            where: {
                id: request.params.id,
                userId: data.id
            }
        })
    })
    .then(data => {
        if (data.dataValues.id == request.params.id) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {authenticate, authorize, authorizeFavorites}
