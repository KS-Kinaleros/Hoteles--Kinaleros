'use strict'

const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
    name:{
        type: String,
/*         required: true */
    },
    address:{
        type: String,
/*         required: true */
    },
    phone:{
        type: String,
/*         required: true */
    },
    email:{
        type: String,
/*         required: true */
    },
    ///ver si tiene que llevar un user admin
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraService',
/*         required: true */
    },
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }

},{versionKey: false})

module.exports = mongoose.model('Hotel', hotelSchema)