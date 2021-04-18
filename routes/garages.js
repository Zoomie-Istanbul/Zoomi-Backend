const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/garageController')


router.post('/',Controller.create)
router.use(authenticate)
router.put('/', Controller.update)
router.get('/garageProfile', Controller.profile)
router.patch('/', Controller.status)
router.get('/', Controller.allGarage)
router.get('/:id', Controller.garageDetail)


module.exports = router
