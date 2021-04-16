const express = require('express')
const {authenticate, authorizeTransaction} = require('../middlewares/authMiddleware.js')
const Controller = require('../controllers/transactionController.js')
const router = express.Router()

router.use(authenticate)
router.get('/', Controller.index)
router.post('/', Controller.create)
router.get('/:id', authorizeTransaction, Controller.details)
router.put('/:id', authorizeTransaction, Controller.update)
router.patch('/:id', authorizeTransaction, Controller.updateStatus)


module.exports = router
