'use strict'

const express = require('express')
const api = express.Router()
const billController = require('./bill.controller')

api.get('/test', billController.test)
api.post('/save/:id', billController.addBill)
api.put('/update/:id', billController.updateBill)
api.delete('/delete/:id', billController.deleteBill)
api.get('/get', billController.getBill)
api.get('/getId/:id', billController.getBillId)

module.exports = api