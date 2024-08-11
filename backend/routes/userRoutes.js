const express = require('express')
const UserControllers = require('../controllers/userController')
const router = express.Router()
const AuthMiddlewre = require('../middlewares/AuthMiddleware')
const handleErrorMessage = require('../middlewares/handleErrorMessage')
const { body } = require('express-validator')

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/me', AuthMiddlewre, UserControllers.me)

router.post('/login', [
    body('email').isEmail().trim().notEmpty(),
    body('password').notEmpty(),
], handleErrorMessage, UserControllers.login)

router.post('/register', [
    body('name').notEmpty(),
    body('email').isEmail().trim().notEmpty(),
    body('password').notEmpty(),
], handleErrorMessage, UserControllers.register,)

router.patch('/updateProfile/:userId', upload.single('file'), UserControllers.updateProfile)

router.post('/logout', UserControllers.logout)

module.exports = router