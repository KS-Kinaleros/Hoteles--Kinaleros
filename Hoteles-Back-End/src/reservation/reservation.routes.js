'use strict'

const express = require('express')
const api = express.Router()
const reservationController = require('./reservation.controller')

api.get('/test', reservationController.test)
api.post('/save', reservationController.addReservation)
api.put('/update/:id', reservationController.updateReservation)
api.delete('/delete/:id', reservationController.deleteReservation)
api.get('/get', reservationController.getReservation)

module.exports = api