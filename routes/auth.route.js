const route = require('express').Router()
const authController = require('../controllers/auth/auth.controller')
route.post('/signup', authController.signup)
route.post('/signin', authController.signin)


module.exports= route