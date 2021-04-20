const express = require('express')
const request = require('supertest')
const app = require('../app.js')
const {deleteUsers, deleteGarage, deleteFavorite} = require('../helpers/testsHelpers.js')
const {sign} = require('../helpers/jwtHelper.js')
const {Users, Garages, Favorites, Transactions} = require('../models')
const { response } = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const favorites = require('../models/favorites.js')


let garageToken = ''
let token = ''
let testingTransaction = {}
idUser = 0
idTransaction = 0

beforeAll(function(done) {
        Users.create({
            name:'test user',
            email: 'testmail@mail.com',
            username: 'testUserNotGarage',
            password: 'tester',
            roles: 'user'
        })
        .then(data => {
            let tokenMaterial = {
                name: data.name,
                email: data.email,
                username: data.username,
                id: data.id
            }
            idUser = data.id
            // console.log('ini user id', idUser);
            // console.log('ini data id', idUser);
            token = sign(tokenMaterial)
            return Users.create({
                name:'test user',
                email: 'testnotadmin@mail.com',
                username: 'testGarage',
                password: 'tester',
                roles: 'garage'
            })
        })
        .then(({dataValues}) => {
            let data = dataValues
            let tokenMaterial = {
                name: data.name,
                email: data.email,
                username: data.username,
                id: data.id
            }
            garageToken = sign(tokenMaterial)
            userId = data.id
            return Garages.create({
                name: 'testGarage',
                userId: data.id,
                address: 'testAddress'
            })
        })
        .then((data) =>{
            let newTestingTransaction = {
                status : 0,
                userId : idUser,
                garageId : data.dataValues.id,
            }
            testingTransaction = newTestingTransaction
            return Transactions.create(testingTransaction)
        })
        .then(data =>{
            idTransaction = +data.dataValues.id
            done()
        })
        .catch(err => {
            return 0
        })
}, 30000)


describe('testing Transactions',() => {

    it('Successfully create transaction', (done) => {
    
        request(app)
       .post('/transactions')
       .set('access_token', token)
       .send({
           garageId: testingTransaction.garageId,
           userId : testingTransaction.userId,
           status : 0,
           date : new Date,
           price : 1000
       })
       .set('Accept', 'application/json')
       .then((response) =>{
           const { body, status } = response
           expect(status).toEqual(201)
           done()
       })
       .catch(err =>{
           console.log(err, "ini error");
           done(err)
       })

       
})

    it('Create transaction without token', (done) => {
        
        request(app)
        .post('/transactions')
        .send({
           garageId: testingTransaction.garageId,
           userId : testingTransaction.userId,
           status : 0,
           date : new Date,
           price : 4000
        })
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(400)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })

    })

    it('Create transaction without userId', (done) => {
        
        request(app)
        .post('/transactions')
        .set('access_token', token)
        .send({
            garageId: testingTransaction.garageId,
            // userId : testingTransaction.userId,
            status : 0,
            date : new Date,
            price : 4000
         })
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(201)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Create transaction without garageId', (done) => {
        
        request(app)
        .post('/transactions')
        .set('access_token', token)
        .send({
            // garageId: testingTransaction.garageId,
            userId : testingTransaction.userId,
            status : 0,
            date : new Date,
            price : 4000
         })
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(500)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Create transaction without status', (done) => {
        
        request(app)
        .post('/transactions')
        .set('access_token', token)
        .send({
            garageId: testingTransaction.garageId,
            userId : testingTransaction.userId,
            // status : 0,
            date : new Date,
            price : 4000
         })
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(201)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Show all transactions', (done) => {
        
        request(app)
        .get('/transactions')
        .set('access_token', token)
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(200)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Show all favorites without token', (done) => {
        
        request(app)
        .get('/favorites')
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(400)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Get user by params', (done) => {
        request(app)
        .get(`/user/${idUser}`)
        .set('access_token', token)
        .set('Accept', 'application/json')
        .then((response) =>{
            const { body, status } = response
            expect(status).toEqual(200)
            done()
        })
        .catch(err =>{
            console.log(err, "ini error");
            done(err)
        })
    })

    it('Successfully edit transaction', (done) => {
    
        request(app)
       .put(`/transactions/${idTransaction}`)
       .set('access_token', token)
       .send({
           status : 2,
           price : 1000
       })
       .set('Accept', 'application/json')
       .then((response) =>{
           const { body, status } = response
           expect(status).toEqual(200)
           done()
       })
       .catch(err =>{
           console.log(err, "ini error");
           done(err)
       })

       
})

        it('Successfully update transaction status', (done) => {
            
            request(app)
            .patch(`/transactions/${idTransaction}`)
            .set('access_token', token)
            .send({
                status : 1
            })
            .set('Accept', 'application/json')
            .then((response) =>{
                const { body, status } = response
                expect(status).toEqual(200)
                done()
            })
            .catch(err =>{
                console.log(err, "ini error");
                done(err)
            })

        
        })

        it('Successfully get transaction by params', (done) => {
            
            request(app)
            .get(`/transactions/${idTransaction}`)
            .set('access_token', token)
            .set('Accept', 'application/json')
            .then((response) =>{
                const { body, status } = response
                expect(status).toEqual(200)
                done()
            })
            .catch(err =>{
                console.log(err, "ini error");
                done(err)
            })

        
        })

        it('Edit transaction with wrong params', (done) => {
    
            request(app)
           .put(`/transactions/a`)
           .set('access_token', token)
           .send({
               status : 2,
               price : 1000
           })
           .set('Accept', 'application/json')
           .then((response) =>{
               const { body, status } = response
               expect(status).toEqual(500)
               done()
           })
           .catch(err =>{
               console.log(err, "ini error");
               done(err)
           })
    
           
    })



    
})

afterAll(function(done) {
    deleteUsers()
    deleteGarage()
    deleteFavorite()
    done()
})