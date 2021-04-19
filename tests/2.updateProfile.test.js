const express = require('express')
const request = require('supertest')
const app = require('../app.js')
const {deleteUsers, deleteGarage, createGarage, createUser} = require('../helpers/testsHelpers.js')
const {sign} = require('../helpers/jwtHelper.js')
const {Users, Garages} = require('../models')
const { response } = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')


let garageToken = ''
let token = ''

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
            return Garages.create({
                name: 'testGarage',
                userId: data.id,
                address: 'testAddress'
            })
        })
        .then(() =>{
            done()
        })
        // .then(data => {
        //         return 1
        // })
        .catch(err => {
            return 0
        })
        // done()
}, 30000)


describe('testing update profile',() => {

    it('should return response with status 200', (done) => {
    
        request(app)
       .post('/login')
       .send({
           username: 'testUserNotGarage',
           password : 'tester',
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

    it('Successfully update profile', (done) => {
    
        request(app)
       .put('/update-profile')
       .set('access_token', token)
       .send({
           username: 'test',
           email : 'emailbaru@mail.com',
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

    it('Update profile without token', (done) => {
    
             request(app)
            .put('/update-profile')
            .send({
                username: 'test',
                name: 'testName',
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

    it('Invalid email format', (done) => {
    
        request(app)
        .put('/update-profile')
        .set('access_token', token)
        .send({
            username: 'test',
            email : 'emailbodong',
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
})

afterAll(function(done) {
    deleteUsers()
    deleteGarage()
    done()
})