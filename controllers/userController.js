const { Users } = require('../models')
const {hash} = require('../helpers/passwordHelper.js')

class UserController {
    static index(request, response, next){
        Users.findAll()
            .then(data => {
                let returnData = data
                returnData.map(datas => (delete datas.dataValues.password))
                response.status(200).json(returnData)
            })
            .catch(err => {
                next(err)
            })
    }
    static find(request, response, next){
        Users.findOne({
            where: {
                id: request.params.id
            }
        })
            .then(data => {
                let returnData = data.dataValues
                delete returnData.password
                response.status(200).json(returnData)
            })
            .catch(err => {
                next(err)
            })
    }
    static update(request, response, next){
          let data ={
              username: (request.body.username) ? request.body.username : null,
              name: (request.body.name) ? request.body.name : null,
              email: (request.body.email) ? request.body.email : null,
              image: (request.body.image) ? request.body.image : null
          }
          Users.update(data,{
              where: {
                  id: request.userData.id
              },
              returning: true
          })
              .then(data => {
                  if (data[0] === 1) {
                      let returnData = data[1]
                      delete returnData[0].dataValues.password
                      response.status(200).json(returnData[0].dataValues)
                  }else{
                      next({code: 404, msg: 'data not found'})
                  }
              })
              .catch(err => {
                  next(err)
              })
      }
    static changePassword(request, response, next){
        if (request.body.password.length > 5) {
            let data ={
                password: hash(request.body.password)
            }
            Users.update(data,{
                where: {
                    id: request.userData.id
                },
                returning: true
            })
                .then(data => {
                    if (data[0] === 1) {
                        // let returnData = data[1]
                        // delete returnData[0].dataValues.password
                        response.status(200).json({msg : 'password updated'})
                    }else{
                        next({code: 404, msg: 'data not found'})
                    }
                })
                .catch(err => {
                    next(err)
                })
            }else{
                next({code: 400, msg: 'Password must be atleast 6 characters'})
            }
      }
    static delete(request, response, next){
        if (request.params.id) {
            Users.destroy({
                where: {
                    id: request.params.id
                },
                returning: true
            })
                .then(data => {
                    if (data[0] === 1) {
                        response.status(200).json({message: 'user successfully deleted'})
                    }else{
                        next({code: 404, msg: 'data not found'})
                    }
                })
                .catch(err => {
                    next(err)
                })
        }else{
            next({code: 404, msg: 'invalid id'})
        }
      }
}

module.exports = UserController