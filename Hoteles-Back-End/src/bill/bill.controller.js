'use strict'

const Bill = require('./bill.model')
const Reservation = require('../reservation/reservation.model')

exports.test = (req, res) => {
    res.send({ message: 'Test bill is running' })
}

//agregar
exports.addBill = async (req, res) => {
    try {
        let reservationId = req.params.id

        //obtener la reservacion
        let reservation = await Reservation.findById(reservationId)
        if (!reservation) return res.status(404).send({ message: 'La reservacion no fue encontrada' })
        //validar que no hayan facturas duplicadas
        let billExist = await Bill.findOne({ reservation: reservationId })
        if (billExist) return res.status(404).send({ message: 'La factura ya fue creada' })

        //obtener los datos para generar factura
        let entryDate = reservation.entryDate
        let departureDate = reservation.departureDate
        let room = reservation.room
        let user = reservation.user
        let total = reservation.total

        //data para agregar
        let bill = new Bill({
            dateOfIssue: new Date(),
            user: user,
            reservation: reservation._id,
            total: total
        })

        await bill.save()

        if (!bill) return res.status(404).send({ message: "Factura no se pudo generar correctamente" })
        return res.send({ message: 'Se genero factura' })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al guardar factura', err })
    }
}

//editar
exports.updateBill = async (req, res) => {
    try {
        let billId = req.params.id
        let data = req.body

        let bill = await Bill.findOneAndUpdate(
            { _id: billId },
            data,
            { new: true }
        )
        if (!bill) return res.status(404).send({ message: 'Factura no encontrada' })
        return res.send({ message: 'Factura actualizada', bill })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al editar factura', err })
    }
}

//eliminar
exports.deleteBill = async (req, res) => {
    try {
        let billId = req.params.id
        let bill = await Bill.findOneAndDelete({ _id: billId })
        if (!bill) return res.status(404).send({ message: 'Factura no encontrada' })
        return res.send({ message: 'Factura eliminada' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al eliminar factura', err })
    }
}

exports.getBill = async (req, res) => {
    try {
        let bills = await Bill.find()
        return res.send({ message: 'Facturas encontradas:', bills })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al obtener facturas', err })
    }
}

//obtener bill por id
exports.getBillId = async (req, res) => {
    try {
        let billId = req.params.id

        let bill = await Bill.findById(billId)
        if (!bill) return res.status(404).send({ message: 'Factura por id no encontrada' })
        return res.send({ bill })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al obtener factura por id', err })
    }
}
