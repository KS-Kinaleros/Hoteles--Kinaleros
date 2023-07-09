'use strict'

const express = require('express')
const api = express.Router()
const eventController = require('./event.controller')

api.get('/test', eventController.test)
api.post('/save', eventController.addEvent)
api.put('/update/:id', eventController.updateEvent)
api.delete('/delete/:id', eventController.deleteEvent)
api.get('/get', eventController.getEvent)

module.exports = api