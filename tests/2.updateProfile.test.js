const express = require('express')
const request = require('supertest')

const app = require('../app.js')
const {deleteUsers, deleteGarage, createGarage, createUser} = require('../helpers/testsHelpers.js')
const {sign} = require('../helpers/jwtHelper.js')
const {Users} = require('../models')

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
        .then(data => {
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
            // console.log(data,'Data')
        })
        .then(data => {
                return 1
        })
        .catch(err => {
            return 0
        })
})

describe('testing update profile',() => {
    it('tidak menyertakan akses token',async (done) => {
        jest.setTimeout(30000);
        await request(app)
            .put('/update-profile')
            // .post('access_token', adminToken)
            .send({
                username: 'test',
                name: 'testName',
            })
            .end((err, response) => {
                if (err) {
                    done(err)
                    return 0
                }else{
                    console.log(response, 'ini response')
                    console.log(response.status,' ini status')
                    expect(response.status).toEqual(400)
                    done()
                    return 1
                }
            })
    })

    it('field diisi tipe data tidak sesuai',async (done) => {
        jest.setTimeout(30000);
        await request(app)
            .put('/update-profile')
            .set('access_token', token)
            .send({
                username: 'test',
                email: 'rerere@gmail.com',
                name: 'testName',
            })
            .end((err, response) => {
                if (err) {
                    done(err)
                    return 0
                }else{
                    // console.log(response.body)
                    expect(response.status).toEqual(400)
                    done()
                    return 1
                }
            })
    })
})

afterAll(function(done) {
    deleteUsers()
    deleteGarage()
    done()
})