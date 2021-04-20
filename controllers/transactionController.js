const Model = require('../models').Transactions
const {Users, Garages} = require('../models')

class TransactionController {
    static index(request, response, next){
        let where = {}
        if (request.params.garageId) {
            where.garageId = request.params.garageId
        }
        if (request.params.userId){
            where.userId = request.userData.id
        }
        if (request.params.status) {
            where.status = request.params.status
        }
        Model.findAll({
          order: [
            ['id', 'DESC']
          ],
          include:[
            {
              model: Users
            },
            {
                model: Garages
              },
        ],
          where: where
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static details(request, response, next) {
        Model.findOne({
          order: [
            ['id', 'DESC']
          ],
          include:[
            {
              model: Users
            },
            {
                model: Garages
            },
        ],
          where: {
              id: request.params.id
          }
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static create(request, response, next){
        let data = {
            userId: request.userData.id,
            garageId: request.body.garageId,
            date: new Date,
            status: 0,
            price: 0,
            description: request.body.description,
        }
        // console.log(data,'ini data')
        Model.create(data)
            .then(data => {
                response.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static update(request, response, next){
        let data = {
            status: request.body.status,
        }
        if (request.body.price) {
            data.price = request.body.price //optional
        }
        if (request.body.date) {
            data.date = request.body.date //optional
        }
        if (request.body.description) {
            data.description = request.body.description //optional
        }
        Model.update(data,{
            where: {
                id: request.params.id
            },
            returning: true
        })
            .then(data => {
                if (data[0] == 1) {
                    response.status(200).json({data: data[1][0].dataValues})
                }else{
                    response.status(404).json({msg: 'data not found'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
    static updateStatus(request, response, next){
        let data = {
            status: request.body.status,
        }
        Model.update(data, {
            where: {
                id: request.params.id
            }
        })
            .then(data => {
                response.status(200).json({msg: 'Status Updated!'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TransactionController