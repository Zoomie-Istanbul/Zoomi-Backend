const express = require('express')
const request = require('supertest')
const app = require('../app.js')
const {deleteUsers, deleteGarage, deleteFavorite} = require('../helpers/testsHelpers.js')
const {sign} = require('../helpers/jwtHelper.js')
const {Users, Garages, Favorites} = require('../models')
const { response } = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const favorites = require('../models/favorites.js')


let garageToken = ''
let token = ''
let testingFavorite = {}

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
            let newtestingFavorite = {
                status : 0,
                userId : data.dataValues.userId,
                garageId : data.dataValues.id
            }
            testingFavorite = newtestingFavorite
            return testingFavorite
        })
        .then(data =>{
            done()
        })
        .catch(err => {
            return 0
        })
}, 30000)


describe('testing Favorites',() => {

    it('Successfully create favorites', (done) => {
    
        request(app)
       .post('/favorites')
       .set('access_token', token)
       .send({
           garageId: testingFavorite.garageId,
           userId : testingFavorite.userId,
           status : 0
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

    it('Create favorites without token', (done) => {
        
        request(app)
        .post('/favorites')
        .send({
            garageId: testingFavorite.garageId,
            userId : testingFavorite.userId,
            status : 0
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

    it('Create without userId', (done) => {
        
        request(app)
        .post('/favorites')
        .set('access_token', token)
        .send({
            garageId: testingFavorite.garageId,
            userId : null,
            status : 0
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

    it('Create without garageId', (done) => {
        
        request(app)
        .post('/favorites')
        .set('access_token', token)
        .send({
            garageId: null,
            userId : testingFavorite.userId,
            status : 0
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

    it('Create without status', (done) => {
        
        request(app)
        .post('/favorites')
        .set('access_token', token)
        .send({
            garageId: testingFavorite.garageId,
            userId : testingFavorite.userId,
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

    it('Show all favorites', (done) => {
        
        request(app)
        .get('/favorites')
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

    
})

afterAll(function(done) {
    deleteUsers()
    deleteGarage()
    deleteFavorite()
    done()
})