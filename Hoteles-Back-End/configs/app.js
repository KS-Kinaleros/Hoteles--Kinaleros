'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const userRoutes = require('../src/user/user.routes')
const extraServiceRoutes = require('../src/extraService/extraService.routes')

const app = express()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/user', userRoutes)
app.use('/extraService', extraServiceRoutes)

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server is runngin in port ${port}`)
}