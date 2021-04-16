const { Garages } = require('../models')

class GarageController{

    static create(request, response, next) {
        let newGarage = {
            name: request.body.name,
            status: request.body.status,
            address: request.body.address,
            image: '',
            userId: request.userData.id
        }
        Garages.create(newGarage)
            .then (data => {
                response.status(201).json({success: true, message: "Garage created", data})
            })
            .catch (err => {
                // console.log(err)
                next(err)
            })
    }
}

module.exports = GarageController