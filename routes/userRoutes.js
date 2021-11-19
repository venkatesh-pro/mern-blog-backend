const express = require('express')
const {
  createUser,
  loginUser,
  uploadImage,
  deleteImage,
} = require('../controller/userController')

const router = express.Router()

router.route('/signup').post(createUser)
router.route('/login').post(loginUser)
router.route('/image-upload').post(uploadImage)
router.route('/image-delete').post(deleteImage)

module.exports = router
