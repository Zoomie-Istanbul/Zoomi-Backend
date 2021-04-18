const { Garages, Users } = require('../models')

class GarageController{

    static create(request, response, next) {

        let registerUser = {
            username: request.body.username.toLowerCase(),
            password: request.body.password,
            email: request.body.email,
            name: "garage owner",
            roles: "garage"
            // garageId: (request.body.garageId) ? request.body.garageId: null,
        }

        

        if (registerUser.password.length < 6 ) {
            next({code: 400, msg: 'Password must be at least 6 characters'})
        }

        Users.create(registerUser)
            .then (data => {
                let newGarage = {
                    name: request.body.name,
                    status: 0,
                    address: request.body.address,
                    description: request.body.description,
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

    static profile(request, response, next){
        Garages.findAll({
            where: {
                userId: request.userData.id
            }
        })
            .then(data => {
                // console.log(request.userData.id, "ini request");
                // console.log(request.params.id, "ini params");
                response.status(200).json(data[0])
            })
            .catch(err => {
                next(err)
            })
    }

    static update(request, response, next){



        let data ={}
        if (request.body.name) {
            data.name= request.body.name
        }
        if (request.body.address) {
            data.address= request.body.address
        }
        if (request.body.image) {
            data.image= request.body.image
        }
        if (request.body.description) {
            data.description= request.body.description
        }
    
            Garages.update(dataInput,{
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
        })
        .catch(err=>{
            next(err)
        })
        
    }

    static status(request, response, next){

        let data ={
            status: (+request.body.status) ? request.body.status : null,
        }

        console.log(request.userData.id);

        // console.log(request.userData, "ini user id");
        Garages.update(data,{
            where: {
                userId: +request.userData.id
            },
            returning: true
        })
            .then(data => {
                console.log(data[0], 'ini dataaa');
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

    static allGarage(request, response, next){
        Garages.findAll()
            .then(data => {
                // console.log(request.userData.id, "ini request");
                // console.log(request.params.id, "ini params");
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static garageDetail(request, response, next){
        Garages.findOne({
            where: {
                id : +request.params.id
            }
        })
            .then(data => {
                response.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = GarageController