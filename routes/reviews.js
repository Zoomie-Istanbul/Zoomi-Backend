const express = require('express')
const router = express.Router()
const { authenticate, authorizeCreateReview, authorizeUpdateReview } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/reviewController')


router.use(authenticate)
router.post('/:id', authorizeCreateReview, Controller.create)
router.get('/:id', Controller.findOne)
router.get('/', Controller.findAll)
router.put('/:id', authorizeUpdateReview, Controller.update)



module.exports = router
