'use strict'

const express = require('express')
const api = express.Router()
const roomController = require('./room.controller')
const {ensureAuth, isAdmin} = require('../services/authenticated')

api.get('/test', roomController.test)
api.post('/save', roomController.addRoom)
api.put('/update/:id', roomController.updateRoom)
api.delete('/delete/:id', roomController.deleteRoom)
api.get('/getOcu', roomController.getRoomsOcupada)
api.get('/getRoom', ensureAuth ,roomController.getRoomAdmin)
api.get('/getRoomLi', roomController.getRoomLibres)

module.exports = api