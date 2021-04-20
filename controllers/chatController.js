const Model = require('../models').Chats
const {Users, Garages, UserChats} = require('../models')

class chatController {
    static async index(request, response, next){
        let where = {}
        if (request.userData.roles == 'user') {
            where.userId = request.userData.id
            where.garageId = request.params.id
        }else{
            await (Garages.findOne({
                where: {
                    userId: request.userData.id
                }
            })
            .then(data => {
                where.garageId = data.id
                where.userId = request.params.id
            })
            ) 
        }
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
          where: where
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static async list(request, response, next){
        let where = {}
        if (request.userData.roles == 'user') {
            where.userId = request.userData.id
        }else{
            await (Garages.findOne({
                where: {
                    userId: request.userData.id
                }
            })
            .then(data => {
                where.garageId = data.id
            })
            ) 
        }
        UserChats.findAll({
          order: [
            ['id', 'DESC']
          ],
          include : [
              {
                  model: Model,
                    include:[
                      {
                        model: Users,
                        attributes: ['id','name','image']
                      },
                      {
                          model: Garages,
                      },
                    ]
              },
              {
                model: Users,
                attributes: ['id','name','image']
              },
              {
                  model: Garages,
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
    static async create(request, response, next){
        let data = {
            message: request.body.message,
        }
        if (request.userData.roles == 'user') {
            data.sender = "user"
            data.userId = request.userData.id
            data.garageId = request.params.id
        }else {
            data.sender = "garage"
            data.userId = request.params.id
            await (Garages.findOne({
                where: {
                    userId: request.userData.id
                }
            })
            .then(datas => {
                data.garageId = datas.id
            }))
        }
        UserChats.findOrCreate({
            where: {
                userId: data.userId,
                garageId: data.garageId
            },
            defaults: {
                userId: data.userId,
                garageId: data.garageId,
                status: 1
            }
        })
        .then(userChatsData => {
            data.userChatId = userChatsData[0].dataValues.id
            return Model.create(data)
        })
        .then(data => {
            global.io.emit('newChat', data);
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
