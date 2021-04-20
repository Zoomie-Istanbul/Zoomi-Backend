const { Users, Favorites, Garages, Transactions, Chats, Reviews } = require('../models')
const { verifyToken } = require('../helpers/jwtHelper.js')
const { Op } = require("sequelize");

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
                request.userData = data
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

const authorizeTransaction = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
            email: request.userData.email
        }
    })
    .then(data => {
        if (data.roles == 'user') {   
            return Transactions.findOne({
                where: {
                    id: request.params.id,
                    userId: data.id
                }
            })
        }else{
            return (
                Garages.findOne({
                    where: {
                        userId: data.id
                    }
                })
                .then(datas => {
                    return Transactions.findOne({
                        where: {
                            id: request.params.id,
                            garageId: datas.id
                        }
                    })
                })
            )
        }
    })
    .then(data => {
        if (data && data.dataValues.id == request.params.id) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}
const authorizeUpdateReview = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
            email: request.userData.email
        }
    })
    .then(data => {
        return Reviews.findOne({
            where: {
                id: request.params.id,
                userId: data.id
            }
        })
    })
    .then(data => {
        if (data && data.dataValues.id == request.params.id) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}
const authorizeCreateReview = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
            email: request.userData.email
        }
    })
    .then(data => {
        return Transactions.findOne({
            where: {
                id: request.params.id,
                userId: data.id,
            }
        })
    })
    .then(data => {
        console.log(data,'ini data')
        if (data.isReviewed == 1) {
            next({code:403, msg: 'You already reviewed this item'})
        } else if (data && data.dataValues.id == request.params.id) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}

const authorizeDeleteChats = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
        }
    })
    .then(data => {
        if (data.roles == 'user') {   
            return Chats.findOne({
                where: {
                    id: request.params.id,
                    userId: data.id
                }
            })
        }else{
            return (
                Garages.findOne({
                    where: {
                        userId: data.id
                    }
                })
                .then(datas => {
                    return Chats.findOne({
                        where: {
                            id: request.params.id,
                            garageId: datas.id
                        }
                    })
                })
            )
        }
    })
    .then(data => {
        if (data && data.dataValues.id == request.params.id && data.sender == request.userData.roles) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {authenticate, authorize, authorizeFavorites, authorizeTransaction, authorizeDeleteChats, authorizeCreateReview, authorizeUpdateReview}
