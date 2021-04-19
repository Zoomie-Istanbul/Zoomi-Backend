const express = require('express')
const router = express.Router()
const multer = require('multer')
const ImgurStorage = require('multer-storage-imgur');
const { authenticate } = require('../middlewares/authMiddleware')
const GarageController = require('../controllers/garageController')
const AuthController = require('../controllers/authController.js')
const UserController = require('../controllers/userController.js')
const Users = require('./users.js')
const Favorites = require('./favorites.js')
const Transactions = require('./transactions.js')
const Items = require('./items.js')
const Garages = require('./garages.js')
const Chats = require('./chats.js')


const upload = multer({ storage: ImgurStorage({clientId: '6c52d60b29cb368'})})

router.post('/register',AuthController.register)
router.post('/login',AuthController.login)
router.put('/update-profile', authenticate, UserController.update)
router.patch('/upload-avatar', upload.single('image'),authenticate, UserController.uploadAvatar)
router.patch('/change-password', authenticate, UserController.changePassword)
router.post('/login',AuthController.login)

//garage


router.use('/user/', Users)
router.use('/garage/', Garages)
router.use('/favorites/', Favorites)
router.use('/transactions/', Transactions)
router.use('/item/', Items)
router.use('/chats/', Chats)

// router.use(authenticate)



module.exports = router
