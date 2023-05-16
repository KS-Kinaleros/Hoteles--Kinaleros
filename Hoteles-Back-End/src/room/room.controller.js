'use strict'

const Room = require('./room.model')
const Reservation = require('../reservation/reservation.model')

exports.test = (req, res) => {
    res.send({ message: 'Test room is running' })
}

exports.addRoom = async (req, res) => {
    try {
        let data = req.body
        let existRoom = await Room.findOne({ name: data.name })
        if (existRoom) return res.send({ message: 'Habitacion ya ha sido creado' })
        let room = new Room(data)
        await room.save()
        return res.status(201).send({ message: 'Habitacion creada' })
    } catch (err) {
        console.error(err)
    }
}

exports.updateRoom = async (req, res) => {
    try {
        let roomId = req.params.id
        let data = req.body

        //quiero ver el precio de la habitacion anterior
        let room = await Room.findById(roomId)
        let oldPrice = room.price;

        let roomUpdate = await Room.findOneAndUpdate(
            { _id: roomId },
            data,
            { new: true, runValidators: true }
        )
        if (!roomUpdate) return res.status(400).send({ message: "Habitacion no actualizada" })


        if (roomUpdate.price !== oldPrice) {
            // El precio de la habitación ha cambiado
            // Actualizar las reservaciones que tenga a esta habitacion

            let reservations = await Reservation.find({ room: roomId });

            for (let i = 0; i < reservations.length; i++) {
                let reservation = reservations[i];

                let entryDate = new Date(reservation.entryDate);
                let departureDate = new Date(reservation.departureDate);
                // Calcular la cantidad de días de la reserva
                let millisecondsPerDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
                let totalDays = Math.round(Math.abs((departureDate.getTime() - entryDate.getTime()) / millisecondsPerDay));

                let newTotal = roomUpdate.price * totalDays;

                await Reservation.findByIdAndUpdate(
                    reservation._id,
                    { total: newTotal },
                    { new: true }
                );
            }
        }

        return res.send({ message: "Habitacion actualizada:", roomUpdate })


    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Error al actualizar", err })
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        //obtener id
        let roomId = req.params.id
        let roomDelete = await Room.findOneAndDelete({ _id: roomId })
        if (!roomDelete) return res.status(404).send({ message: 'Habitacion no eliminada' })
        return res.send({ message: `Habitacion ${roomDelete.name} Eliminado` })
    } catch (err) {
        console.error(err)
    }
}

//ver que habitaciones estan ocupadas
exports.getRoomsOcupada = async (req, res) => {
    try {
        let room = await Room.findOne({availability: 'ocupada'})
        return res.send({ message: 'Habitaciones encontradas:', room })
    } catch (err) {
        console.error(err)
    }
}