const express = require('express')
const {authenticate, authorizeFavorites} = require('../middlewares/authMiddleware.js')
const Controller = require('../controllers/favoriteController.js')
const router = express.Router()


router.use(authenticate)
router.get('/', Controller.index)
router.post('/', Controller.create)
router.get('/:id', Controller.detail)
router.delete('/:id', authorizeFavorites, Controller.delete)


module.exports = router
