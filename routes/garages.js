const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/garageController')


router.post('/',Controller.create)
router.use(authenticate)
router.put('/', Controller.update)
router.get('/', Controller.profile)



module.exports = router
