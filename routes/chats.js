const express = require('express')
const router = express.Router()
const { authenticate, authorizeDeleteChats } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/chatController')


router.use(authenticate)
router.post('/:id', Controller.create)
router.get('/:id', Controller.index)
router.get('/', Controller.list)
router.delete('/:id', authorizeDeleteChats, Controller.delete)



module.exports = router
