const express = require('express')
const UserControllers = require('../controllers/userController')
const router = express.Router()

router.get('/me', UserControllers.me)
router.post('/login', UserControllers.login)
router.post('/register', UserControllers.register)

module.exports = router