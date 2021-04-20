const { Garages, Users } = require('../models')

class GarageController{

    static create(request, response, next) {

        let registerUser = {
            username: request.body.username,
            password: request.body.password,
            email: request.body.email,
            name: "garage owner",
            roles: "garage"
            // garageId: (request.body.garageId) ? request.body.garageId: null,
        }

        

        if (registerUser.password.legth < 6 ) {
            next({code: 400, msg: 'Password must be at least 6 characters'})
        }

        Users.create(registerUser)
            .then (data => {
                let newGarage = {
                    name: request.body.name,
                    status: request.body.status,
                    address: request.body.address,
                    image: '',
                    userId: data.id
                }
                Garages.create(newGarage)
                    .then (data => {
                        response.status(201).json({success: true, message: "Garage created", data})
                    })
                    .catch (err => {
                        // console.log(err)
                        next(err)
                    })
            })
            .catch (err => {
                // console.log(err)
                next(err)
            })
    }

    static detail(request, response, next){
        Garages.findOne({
            where: {
                id: request.params.id
            }
        })
            .then(data => {
                if(+data.userId === +request.userData.id){
                let returnData = data.dataValues
                response.status(200).json(returnData)
                }
                else{
                response.status(401).json({msg: "unauthorized user"})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(request, response, next){
        let data ={
            name: (request.body.name) ? request.body.name : null,
            address: (request.body.address) ? request.body.address : null,
            image: (request.body.image) ? request.body.image : null
        }

        // console.log(request.userData, "ini user id");
        Garages.update(data,{
            where: {
                userId: request.userData.id
            },
            returning: true
        })
            .then(data => {
                if (data[0] === 1) {
                    let returnData = data[1]
                    response.status(200).json(returnData[0].dataValues)
                }else{
                    next({code: 404, msg: 'data not found'})
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = GarageController