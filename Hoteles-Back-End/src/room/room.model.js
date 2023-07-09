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
    },
    hotel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }
},{versionKey: false})

module.exports = mongoose.model('Room', roomSchema)