'use strict'

const mongoose = require('mongoose')

const billSchema = mongoose.Schema({
    dateOfIssue: {
        type: Date,
/*         required: true */
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
/*         required: true */
    },
    reservation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
/*         required: true */
    },
    total: {
        type: Number,
/*         required: true */
    }
}, { versionKey: false })

module.exports = mongoose.model('Bill', billSchema)