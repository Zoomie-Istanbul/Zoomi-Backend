const Model = require('../models').Favorites
const {Users, Garages} = require('../models')

class favoriteController {
    static index(request, response, next){
        let where = {}
        if (request.body.garageId) {
            where.garageId = request.body.garageId
        }else{
            where.userId = request.userData.id
        }
        Model.findAll({
          order: [
            ['id', 'DESC']
          ],
          include:{
            model: Users,
            attributes: ['id','name','image']
          },
          include:{
            model: Garages,
            attributes: ['id','name','image']
          },
          where: where
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static detail(request, response, next){
        Model.findOne({
            where: {
                id: request.params.id
            },
            include:{
              model: Users,
              attributes: ['id','name','image']
            },
            include:{
              model: Garages,
              attributes: ['id','name','image']
            },
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

module.exports = favoriteController
