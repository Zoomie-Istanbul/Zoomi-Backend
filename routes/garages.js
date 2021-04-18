const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/garageController')


router.post('/',GarageController.create)
router.use(authenticate)
router.put('/', GarageController.update)
router.get('/garageProfile', GarageController.profile)
router.patch('/', GarageController.status)
router.get('/', GarageController.allGarage)
router.get('/:id', GarageController.garageDetail)


module.exports = router
