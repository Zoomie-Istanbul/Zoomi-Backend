const { Users, Garages } = require('../models')
const {  verify } = require('../helpers/passwordHelper.js')
const { sign } = require('../helpers/jwtHelper.js')
const { Op } = require("sequelize");

class AuthController {
    static register(request, response, next) {
        let registerData = {
            username: (request.body.username) ? request.body.username : null,
            password: (request.body.password) ? request.body.password : null,
            email: (request.body.email) ? request.body.email : null,
            name: (request.body.name) ? request.body.name : null,
            image: (request.body.image) ? request.body.image : null,
            roles: "user"
        }
        // if (registerData.password || registerData.password.legth < 6 ) {
        //     next({code: 400, msg: 'Password must be at least 6 characters'})
        // }
        Users.create(registerData)
            .then (data => {
                let userdata = data.dataValues
                delete userdata['password']
                response.status(201).json({success: true, message: "user created", data: userdata})
            })
            .catch (err => {
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
        })
            .then(data => {
                if (data) {
                    if (verify(formData.password, data.password)){
                        let tokenMaterial = {
                            id: data.id,
                            username: data.username,
                            email: data.email
                        }
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