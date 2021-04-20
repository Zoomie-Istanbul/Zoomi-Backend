// const { Garages, Users, Items } = require('../models')

// class ItemController{

//     static create(request, response, next) {
//         // console.log(+request.userData.id, "ini payload");
//         Garages.findOne({
//             where: {
//                 userId: +request.userData.id
//             }
//         })
//         .then(data=>{
//             // console.log(data, "ini garage dataa");
//             let newItem = {
//                 garageId : data.id,
//                 name: request.body.name,
//                 price: request.body.price,
//                 status: 0
//             }
//             Items.create(newItem)
//             .then(data =>{
//                 response.status(201).json({success: true, message: "Items created", data})
//             })
//             .catch(err=>{
//                 next(err)
//             })
//         })

//         .catch(err =>{
//             next(err)
//         })
//     }

//     static detail(request, response, next){
//         Items.findOne({
//             where: {
//                 id: request.params.id
//             }
//         })
//             .then(data => {
//                 let returnData = data.dataValues
//                 response.status(200).json(returnData)
//             })
//             .catch(err => {
//                 next(err)
//             })
//     }

//     static findAll(request, response, next){
//         Garages.findOne({
//             where: {
//                 userId : +request.userData.id
//             }
//         })
//         .then(data =>{
//             Items.findAll({
//                 where: {
//                     garageId: data.id,
//                     status : 1
//                 }
//             })
//                 .then(data => {
//                     response.status(200).json(data)
//                 })
//                 .catch(err => {
//                     next(err)
//                 })
//         })
//         .catch(err=>{
//             next(err)
//         })
        
//     }

//     static update(request, response, next){
        
//         Garages.findOne({
//             where: {
//                 userId : +request.userData.id
//             }
//         })
//         .then(data =>{
//             Items.findOne({
//                 where: {
//                     id: +request.params.id
//                 }
//             })
//                 .then(data => {
//                     let updateItem ={
//                         name: (request.body.name) ? request.body.name : null,
//                         price: (request.body.price) ? request.body.price : null
//                     }
//                     Items.update(updateItem, {
//                         where: {
//                             id: data.id
//                         },
//                         returning: true
//                     })
//                     .then(data =>{
//                         response.status(201).json(data)
//                     })
//                     .catch(err=>{
//                         next(err)
//                     })
//                 })
//                 .catch(err => {
//                     response.status(404).json({msg:"Item not found"})
//                 })
//         })
//         .catch(err=>{
//             response.status(401).json({msg:"Unauthorized User"})
//         })
//     }

//     static delete(request, response, next){
        
//         Garages.findOne({
//             where: {
//                 userId : +request.userData.id
//             }
//         })
//         .then(data =>{
//             Items.findOne({
//                 where: {
//                     id: +request.params.id
//                 }
//             })
//                 .then(data => {
//                     let updateItem ={
//                         status: (request.body.status) ? request.body.status : null,
//                     }
//                     Items.update(updateItem, {
//                         where: {
//                             id: data.id
//                         },
//                         returning: true
//                     })
//                     .then(data =>{
//                         response.status(201).json(data)
//                     })
//                     .catch(err=>{
//                         next(err)
//                     })
//                 })
//                 .catch(err => {
//                     response.status(404).json({msg:"Item not found"})
//                 })
//         })
//         .catch(err=>{
//             response.status(401).json({msg:"Unauthorized User"})
//         })
//     }
// }

// module.exports = ItemController