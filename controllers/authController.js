const { Users, Garages } = require('../models')
const {  verify } = require('../helpers/passwordHelper.js')
const { sign } = require('../helpers/jwtHelper.js')
const { Op } = require("sequelize");

class AuthController {
    static register(request, response, next) {
        let registerData = {
            username: request.body.username,
            password: request.body.password,
            email: request.body.email,
            name: request.body.name,
            roles: request.body.roles,
            // garageId: (request.body.garageId) ? request.body.garageId: null,
        }
        if (registerData.password.legth < 6 ) {
            next({code: 400, msg: 'Password must be at least 6 characters'})
        }
        Users.create(registerData)
            .then (data => {
                let userdata = data
                delete userdata['password']
                response.status(201).json({success: true, message: "user created", data: userdata})
            })
            .catch (err => {
                // console.log(err)
                next(err)
            })
    }
    static login(request, response, next) {
        let formData = {
            username: request.body.username,
            password: request.body.password
        }
        Users.findOne({
            where: {
                [Op.or]: [{ username: formData.username }, { email: formData.username }]
            },
            // include:{
            //     model: Garages,
            //     attributes: ['id','name','status', 'address']
            //   },
        })
            .then(data => {
                if (data) {
                    // console.log("masuk sini");
                    if (verify(formData.password, data.password)){
                        // console.log("masuk sini coy");
                        let tokenMaterial = {
                            id: data.id,
                            username: data.username,
                            email: data.email
                        }
                        console.log(tokenMaterial);
                        let returnData = data.dataValues
                        delete returnData['password']
                        returnData['access_token'] = sign(tokenMaterial)
                        response.status(200).json({success:true,data: returnData})
                    }else{
                        next({code: 400, msg: 'Username or Password is wrong'})
                    }
                }else{
                    next({code: 400, msg: 'Username or Password is wrong'})
                }
            })
            .catch(err => {
                next({code: 400, msg: err})
            })
    }
}

module.exports = AuthController