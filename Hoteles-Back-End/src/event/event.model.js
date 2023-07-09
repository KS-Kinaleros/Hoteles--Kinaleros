'use strict'

const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    typeEvent:{
        type: String,
        enum:['publico', 'privado'],
        required: true
    },
    dateEvent:{
        type: Date,
        required: true
    }

},{versionKey: false})

module.exports = mongoose.model('Event', eventSchema)