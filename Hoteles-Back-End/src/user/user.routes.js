'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')
const {ensureAuth, isAdmin} = require('../services/authenticated') 

api.get('/test', userController.test)
api.post('/save', userController.addUser)
api.post('/saveAd', userController.addAdmin)
api.post('/login', userController.login)
api.put('/update/:id', userController.updateUser)
api.delete('/delete/:id', userController.deleteUser)
api.get('/get', userController.getUsers)
api.get('/getAd', userController.getAdminUsers)
api.get('/getUserId', ensureAuth, userController.getUserId)
api.put('/updateUser', ensureAuth, userController.updateToken)

module.exports = api