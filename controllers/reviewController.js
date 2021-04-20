const Model = require('../models').Reviews
const { Transactions, Users, Garages } = require('../models')

class ReviewController{

    static create(request, response, next) {
            let newItem = {
                userId: request.userData.id,
                message: request.body.message,
                score: request.body.score,
                transactionId: request.params.id
            }
            Transactions.update({
                isReviewed: 1
            }, {
                where: {
                    id: request.params.id
                },
                returning: true
            })
            .then(data =>{
                newItem['garageId'] = data[1][0].garageId
                return Model.create(newItem)
            })
            .then(data => {
                response.status(201).json({success: true, message: "Review created", review: data})
            })
            .catch(err=>{
                next(err)
            })
    }

    static findOne(request, response, next){
        Model.findOne({
            where: {
                id: request.params.id
            },
            include : [
                {
                    model: Transactions,
                    include: [
                        {
                            model: Garages
                        }
                    ]
                },
                {
                    model: Users,
                    attributes: [
                        'name', 'id', 'image', 'email'
                    ]
                }
            ],
        })
            .then(data => {
                let returnData = data.dataValues
                response.status(200).json(returnData)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAll(req, response, next){
        let where = {}
        let whereGarage = {}
        if (req.query.user) {
            where.userId = req.query.user
        }
        if (req.query.garage) {
            whereGarage.garageId = req.query.garage
        }
        Model.findAll({
            include : [
                {
                    model: Transactions,
                    where: whereGarage,
                    include: [
                        {
                            model: Garages
                        }
                    ]
                },
                {
                    model: Users,
                    attributes: [
                        'name', 'id', 'image', 'email'
                    ]
                }
            ],
            where: where
        })
        .then(data =>{
            response.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
        
    }

    static update(request, response, next){
        
        let data = {}
        if (request.body.message) {
            data.message = request.body.message //optional
        }
        if (request.body.score) {
            data.score = request.body.score //optional
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
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ReviewController