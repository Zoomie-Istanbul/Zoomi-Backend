const express = require('express')
const {authenticate} = require('../middlewares/authMiddleware.js')
const Controller = require('../controllers/transactionController.js')
const router = express.Router()

router.use(authenticate)
router.get('/', Controller.index)
router.post('/', Controller.create)
router.get('/:id', Controller.details)
router.put('/:id', Controller.update)
router.patch('/:id', Controller.updateStatus)


module.exports = router
