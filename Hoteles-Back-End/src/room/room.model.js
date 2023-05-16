'use strict'

const mongoose = require('mongoose')

const roomSchema = mongoose.Schema({
    name:{
        type: String,
/*         required: true */
    },
    description:{
        type: String,
/*         required: true */
    },
    availability:{
        type: String,
        enum: ['libre', 'ocupada', 'limpieza'],
        default: 'libre'
    },
    price:{
        type: Number,
/*         required: true */
    }
},{versionKey: false})

module.exports = mongoose.model('Room', roomSchema)