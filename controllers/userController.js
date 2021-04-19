const { Users } = require('../models')
const {hash} = require('../helpers/passwordHelper.js')
const imgur = require('imgur');
const axios = require('axios')
const base64Img = require('base64-img')
var fs = require('fs');

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
    static async update(request, response, next){
          let data = {}
            if (request.body.username) {
                data.username = request.body.username
            }
            if (request.body.name) {
                data.name = request.body.name
            }
            if (request.body.email) {
                data.email = request.body.email
            }
            if (request.body.image) {

                // let images = await this.uploadAvatar(request.body.image)
                // console.log(images)
                // axios({
                //     method: 'post',
                //     url: 'https://api.imgur.com/3/image',
                //     data: {
                //         image: request.body.image
                //     }
                //   })
                //   .then(data => {

                //   })
                console.log(request.body.image,'ini image')
                // data.image = request.body.image
            }
            console.log('halo ini masuk')
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
      static async uploadAvatar(req, res, next) {
        try {
            Users.update({image: req.file.link},{
                where: {
                    id: req.userData.id
                },
            })
            .then(data => {
                if (data == 1) {
                    res.status(200).json({avatar: req.file.link,message: 'avatar successfully updated'})
                }else{
                    next({code: 400, msg: 'data not found'})
                }
            })
        } catch (error) {
          next(error);
        }
      }
}

module.exports = UserController