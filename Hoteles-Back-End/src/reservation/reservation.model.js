'use strict'

const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    entryDate:{
        type: Date,
        required: true
    },
    departureDate:{
        type: Date,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
/*         required: true */
    },
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
/*         required: true */
    },
    total:{
        type: Number,
/*         required: true */
    }
},{versionKey: false})

module.exports = mongoose.model('Reservation', reservationSchema)