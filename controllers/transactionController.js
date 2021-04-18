const Model = require('../models').Transactions
const {Users, Garages} = require('../models')

class TransactionController {
    static index(request, response, next){
        let where = {}
        if (request.body.garageId) {
            where.garageId = request.body.garageId
        }
        if (request.body.userId){
            where.userId = request.userData.id
        }
        if (request.body.status) {
            where.status = request.body.status
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
            price: request.body.price,
        }
        if (request.body.date) {
            data.date = request.body.date //optional
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