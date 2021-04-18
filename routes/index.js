const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const GarageController = require('../controllers/garageController')
const AuthController = require('../controllers/authController.js')
const UserController = require('../controllers/userController.js')
const Users = require('./users.js')
const Favorites = require('./favorites.js')
const Transactions = require('./transactions.js')
const Items = require('./items.js')
const Garages = require('./garages.js')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.put('/update-profile', authenticate, UserController.update)
router.patch('/change-password', authenticate, UserController.changePassword)
router.post('/login',AuthController.login)

//garage


router.use('/user/', Users)
router.use('/garage/', Garages)
router.use('/favorites/', Favorites)
router.use('/transactions/', Transactions)
router.use('/item/', Items)

// router.use(authenticate)



module.exports = router
