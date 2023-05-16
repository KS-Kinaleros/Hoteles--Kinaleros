'use strict'

const mongoose = require('mongoose')

const extraServiceSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }

},{versionKey: false})

module.exports = mongoose.model('ExtraService', extraServiceSchema)