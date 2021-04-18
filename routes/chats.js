const express = require('express')
const router = express.Router()
const { authenticate, authorizeCreateChats, authorizeDeleteChats } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/chatController')


router.use(authenticate)
router.post('/:id', authorizeCreateChats, Controller.create)
router.get('/:id', Controller.index)
router.delete('/:id', authorizeDeleteChats, Controller.delete)



module.exports = router
