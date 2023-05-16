'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo')
const app = require('./configs/app')
const ownerDef = require('./src/user/user.controller')

ownerDef.ownerDef()
mongoConfig.connect()
app.initServer()