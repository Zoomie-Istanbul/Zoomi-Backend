const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const GarageController = require('../controllers/garageController')
const AuthController = require('../controllers/authController.js')
const UserController = require('../controllers/userController.js')
const Users = require('./users.js')
const Favorites = require('./favorites.js')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.put('/update-profile', authenticate, UserController.update)
router.patch('/change-password', authenticate, UserController.changePassword)
router.post('/login',AuthController.login)

router.use('/user/', Users)
router.use('/favorites/', Favorites)

// router.use(authenticate)

router.post('/garage',GarageController.create)

module.exports = router
