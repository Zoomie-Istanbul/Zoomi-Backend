const express = require('express')
const {authenticate, authorize} = require('../middlewares/authMiddleware.js')
const Controller = require('../controllers/userController.js')
const router = express.Router()


router.get('/', Controller.index)
router.use(authenticate)
router.get('/:id', authorize, Controller.find)
router.delete('/:id', authorize, Controller.delete)


module.exports = router
