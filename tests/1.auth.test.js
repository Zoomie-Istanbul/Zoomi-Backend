const express = require('express')
const request = require('supertest')

const app = require('../app.js')
const {Users, Garages} = require('../models')
const {deleteUsers, deleteGarage} = require('../helpers/testsHelpers.js')

beforeAll(function(done) {
    Users.create({
        name:'test user',
        email: 'testmail@mail.com',
        username: 'testusername',
        password: 'tester',
        roles: 'user'
    })
    .then(data => {
        return Users.create({
            name:'test user 2',
            email: 'testnotadmin@mail.com',
            username: 'testusername2',
            password: 'tester',
            roles: 'garage'
        })
    })
    .then(data => { 
        return Garages.create({
            name: 'testGarage1',
            address: 'testaddress',
            userId: data.id
        })
    })
    .then(data => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('testing post /login',() => {
    it('should return response with status 200',(done) => {
        let reqBody = {
            username: 'testnotadmin@mail.com',
            password: 'tester'
        }
        request(app)
            .post('/login')
            .send(reqBody)
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    // console.log(response.body)
                    expect(response.status).toEqual(200)
                    done()
                }
            })
    })
    it('should return response with status 400',(done) => {
        let reqBody = {
            username: 'admin3@mail.com',
            password: '1234'
        }
        request(app)
            .post('/login')
            .send(reqBody)
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    expect(response.status).toEqual(400)
                    done()
                }
            })
    })
    it('should return response with status 400',(done) => {
        let reqBody = {
            username: 'admin@mail.com',
            password: '12344'
        }
        request(app)
            .post('/login')
            .send(reqBody)
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    expect(response.status).toEqual(400)
                    done()
                }
            })
    })
    it('should return response with status 400',(done) => {
        let reqBody = {
            username: 'admin@mail.com',
            // password: '12344'
        }
        request(app)
            .post('/login')
            .send(reqBody)
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    expect(response.status).toEqual(400)
                    done()
                }
            })
    })
})



afterAll(function(done) {
    deleteUsers()
    deleteGarage()
    done()
})