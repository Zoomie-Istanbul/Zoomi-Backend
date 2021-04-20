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

describe('testing post user /login',() => {
    it('Successfully user login ',(done) => {
        let reqBody = {
            username: 'testmail@mail.com',
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
    it('Wrong Email and password',(done) => {
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

    it('Wrong password, correct email',(done) => {
        let reqBody = {
            username: 'testmail@mail.com',
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

    it('Login without password',(done) => {
        let reqBody = {
            email: 'testmail@mail.com',
            password: null
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

    it('Correct password, wrong email',(done) => {
        let reqBody = {
            email: 'emailbodong@mail.com',
            password: 'tester'
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

    it('Blank password and email',(done) => {
        let reqBody = {
            email: null,
            password: null
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

    it('Login without email or username',(done) => {
        let reqBody = {
            email: null,
            password: 'tester'
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

describe('testing post garage /login',() => {

    it('Garage login without password',(done) => {
        let reqBody = {
            username: 'testnotadmin@mail.com',
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

    it('Successfully garage login ',(done) => {
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

    it('Garage login without username/email',(done) => {
        let reqBody = {
            // username: 'testnotadmin@mail.com',
            password: 'tester'
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

    it('Garage login without username/email and password',(done) => {
        let reqBody = {
            username: '',
            password: ''
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

    it('Garage login with correct email and wrong password',(done) => {
        let reqBody = {
            username: 'testnotadmin@mail.com',
            password: 'passwordasal'
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

    it('Garage login with correct email and wrong password',(done) => {
        let reqBody = {
            username: 'emailasal@mail.com',
            password: 'tester'
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

    it('Garage login with wrong email and wrong password',(done) => {
        let reqBody = {
            username: 'emailasal@mail.com',
            password: 'tester'
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

    it('Find all user',(done) => {
        request(app)
            .get('/')
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    expect(response.status).toEqual(404)
                    done()
                }
            })
    })

    it('Create garage',(done) => {
        let reqBody = {
            username: 'garagecuy',
            email : 'garagebaru@mail.com',
            name: 'bengkel',
            address: "jakarta",
            description: 'bengkel mewah',
            password: 'tester'
        }
        request(app)
            .post('/garage')
            .send(reqBody)
            .end((err, response) => {
                if (err) {
                    done(err)
                }else{
                    expect(response.status).toEqual(201)
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