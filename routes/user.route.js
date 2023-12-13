const route = require('express').Router()

const userController = require('../controllers/user.controller')
const { verifyToken } = require('../utils/verifyUser')


route.put('/:id', verifyToken, userController.updateUser)


module.exports = route