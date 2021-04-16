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
}

module.exports = GarageController