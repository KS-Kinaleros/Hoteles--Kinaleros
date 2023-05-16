'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')

api.get('/test', userController.test)
api.post('/save', userController.addUser)
api.post('saveAd', userController.addAdmin)
api.put('/update/:id', userController.updateUser)
api.delete('/delete/:id', userController.deleteUser)
api.get('get', userController.getUsers)

module.exports = api