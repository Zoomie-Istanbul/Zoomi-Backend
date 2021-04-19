const express = require('express')
const router = express.Router()
const { authenticate } = require('../middlewares/authMiddleware')
const Controller = require('../controllers/garageController')
const multer = require('multer')
const ImgurStorage = require('multer-storage-imgur');

const upload = multer({ storage: ImgurStorage({clientId: '6c52d60b29cb368'})})

router.post('/',Controller.create)
router.use(authenticate)
router.put('/', Controller.update)
router.get('/garageProfile', Controller.profile)
router.patch('/', Controller.status)
router.patch('/upload-avatar', upload.single('image'), Controller.uploadAvatar)
router.get('/', Controller.allGarage)
router.get('/:id', Controller.garageDetail)


module.exports = router
