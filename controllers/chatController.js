const Model = require('../models').Chats
const {Users, Garages} = require('../models')

class chatController {
    static index(request, response, next){
        Model.findAll({
          order: [
            ['id', 'DESC']
          ],
          include:[
            {
              model: Users,
              attributes: ['id','name','image']
            },
            {
                model: Garages,
                attributes: ['id','name','image']
            },
        ],
          where: {
              transactionId: request.params.id
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
            transactionId: request.params.id,
            message: request.body.message
        }
        if (request.body.garageId) {
            data.garageId = request.body.garageId
        }else{
            data.userId = request.userData.id
        }
        Model.create(data)
            .then(data => {
                response.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(request, response, next){
        Model.destroy({
            where:{
                id: request.params.id
            }
        })
            .then(data => {
                response.status(200).json({message: 'item successfully deleted'})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = chatController
