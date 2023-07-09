'use strict'

const express = require('express')
const api = express.Router()
const reservationController = require('./reservation.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/test', reservationController.test)
api.post('/save', ensureAuth,  reservationController.addReservation)
api.put('/update/:id', reservationController.updateReservation)
api.delete('/delete/:id', reservationController.deleteReservation)
api.get('/get', reservationController.getReservation)
api.get('/getReU', ensureAuth, reservationController.getReservatinoUser)

module.exports = api