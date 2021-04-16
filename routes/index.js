const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const GarageController = require('../controllers/garageController')
const AuthController = require('../controllers/authController.js')

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)

// router.use(authenticate)

router.post('/garage',GarageController.create)

module.exports = router
