'use strict'

const express = require('express')
const api = express.Router()
const hotelController = require('./hotel.controller')

api.get('/test', hotelController.test)
api.post('/save', hotelController.addHotel)
api.put('/update/:id', hotelController.updateHotel)
api.delete('/delete/:id', hotelController.deleteHotel)
api.get('/get', hotelController.getHotels)

module.exports = api