const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const GarageController = require('../controllers/garageController')
const AuthController = require('../controllers/authController.js')
const UserController = require('../controllers/userController.js')
// const ItemController = require('../controllers/itemController')
const Users = require('./users.js')
const Favorites = require('./favorites.js')
const Transactions = require('./transactions.js')

router.post('/register',AuthController.register)
router.put('/update-profile', authenticate, UserController.update)
router.patch('/change-password', authenticate, UserController.changePassword)
router.post('/login',AuthController.login)

//garage
router.post('/garage',GarageController.create)
router.put('/garage', authenticate, GarageController.update)
router.get('/garage/:id', authenticate, GarageController.detail)

//item
// router.post('/item', authenticate, ItemController.create)
// router.get('/item/:id', authenticate, ItemController.detail)
// router.get('/item', authenticate, ItemController.findAll)
// router.put('/item/:id', authenticate, ItemController.update)
// router.patch('/item/:id', authenticate, ItemController.delete)

router.use('/user/', Users)
router.use('/favorites/', Favorites)
router.use('/transactions/', Transactions)

// router.use(authenticate)



module.exports = router
