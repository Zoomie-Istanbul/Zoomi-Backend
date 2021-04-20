const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/itemController')


router.use(authenticate)
router.post('/', Controller.create)
router.get('/:id', Controller.detail)
router.get('/', Controller.findAll)
router.put('/:id', Controller.update)
router.patch('/:id', Controller.delete)



module.exports = router
