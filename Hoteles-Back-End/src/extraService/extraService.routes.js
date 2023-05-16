'use strict'

const express = require('express')
const api = express.Router()
const extraServiceController = require('./extraService.controller')

api.get('/test', extraServiceController.test)
api.post('/save', extraServiceController.addExtraService)
api.put('/update/:id', extraServiceController.updateExtraService)
api.delete('/delete/:id', extraServiceController.deleteExtraService)
api.get('/get', extraServiceController.getExtraService)

module.exports = api