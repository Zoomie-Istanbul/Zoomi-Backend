const {Garages, Users} = require('../models')

const deleteUsers = () => {
    Users.destroy({
        where: {}
    })
    .then(data => {
        return 1
    })
    .catch(err => {

        return 0
    })
}
const deleteGarage = () => {
    Garages.destroy({
        where: {}
    })
    .then(data => {
        return 1
    })
    .catch(err => {
        return 0
    })
}

function createUser(){
    Users.create({
        name:'test user',
        email: 'testmail@mail.com',
        username: 'testUserNotGarage',
        password: 'tester',
        roles: 'user'
    })
    .then(data => {
        console.log(data, 'ini data user')
        return 1
    })
    .catch(err => {
        return 0
    })
}

function createGarage () {
    Users.create({
        name:'test user',
        email: 'testnotadmin@mail.com',
        username: 'testGarage',
        password: 'tester',
        roles: 'garage'
    })
    .then(data => {
        return Garages.create({
            name: 'testGarage',
            userId: data.id,
            address: 'testAddress'
        })
        // console.log(data,'Data')
    })
    .then(data => {
        console.log(data,'ini data garage')
            return 1
        })
        .catch(err => {
            return 0
        })
    }


module.exports = { deleteUsers, deleteGarage, createGarage, createUser }
