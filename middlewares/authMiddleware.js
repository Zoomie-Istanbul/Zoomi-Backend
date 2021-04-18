const { Users, Favorites, Garages, Transactions, Chats } = require('../models')
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


const authorizeCreateChats = (request, response, next) => {
    Users.findOne({
        where: {
            id: request.userData.id,
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
                    console.log(datas,'datas')
                    return Transactions.findOne({
                        where: {
                            id: request.params.id,
                            garageId: datas.garageId
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

const authorizeDeleteChats = (request, response, next) => {
    if (request) {
        
    }
    Chats.findOne({
        where: {
            id: request.params.id,
        }
    })
    .then(data => {
        if (data.roles == 'user') {   
            return Chats.findOne({
                where: {
                    id: request.body.transactionId,
                    userId: request.userData.userId
                }
            })
        }else{
            return (
                Garages.findOne({
                    where: {
                        userId: request.userData.id
                    }
                })
                .then(datas => {
                    return Chats.findOne({
                        where: {
                            id: request.body.transactionId,
                            garageId: request.data.garageId
                        }
                    })
                })
            )
        }
    })
    .then(data => {
        if (data && data.dataValues.id == request.body.transactionId) {
            next()
        }else{
            next({code:403, msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}


module.exports = {authenticate, authorize, authorizeFavorites, authorizeTransaction, authorizeCreateChats, authorizeDeleteChats}
