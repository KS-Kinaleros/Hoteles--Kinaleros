'use strict'

const Reservation = require('./reservation.model')
const Room = require('../room/room.model')

exports.test = (req, res) => {
    res.send({ message: 'Test reservation is running' })
}

//guardar
exports.addReservation = async (req, res) => {
    try {
        let userId = req.user.sub
        let data = req.body
        //calcular la cantidad de dias que se quedara
        let entryDate = new Date(data.entryDate);
        let departureDate = new Date(data.departureDate);

        console.log(entryDate)
        console.log(departureDate)

        let millisecondsPerDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
        let totalDays = Math.round(Math.abs((departureDate.getTime() - entryDate.getTime()) / millisecondsPerDay));

        //multiplicar por el precio de la habitacion
        let room = await Room.findById(data.room)
        let price = room.price * totalDays
        console.log(price)

        room.availability = 'ocupada'
        await Room.findOneAndUpdate(
            {_id: data.room},
            {availability: 'ocupada'}
        )

        let reservation = new Reservation({
            entryDate: data.entryDate,
            departureDate: data.departureDate,
            user: userId,
            room: data.room,
            total: price
        }
        )

        await reservation.save()
        return res.status(201).send({ message: 'Reservacion creada' })
    } catch (err) {
        console.log(err)
        return res.status(500).send({message:'Error', err})
    }
}

//update
exports.updateReservation = async (req, res) => {
    try {
        //obtener id
        let reservationId = req.params.id
        //obtener data
        let data = req.body

        //cantidad de dias que se quedara
        let entryDate = new Date(data.entryDate);
        let departureDate = new Date(data.departureDate);
        let millisecondsPerDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
        let totalDays = Math.round(Math.abs((departureDate.getTime() - entryDate.getTime()) / millisecondsPerDay));

        //obtener la reservacion actual
        let reservation = await Reservation.findById(reservationId);

        // Verificar si la reservacion existe
        if (!reservation) {
            return res.status(404).send({ message: 'Reserva no encontrada' });
        }
        // Obtener la habitación asociada
        let room = await Room.findById(reservation.room);
        // Verificar si la habitación existe
        if (!room) {
            return res.status(404).send({ message: 'Habitación no encontrada' });
        }

        // Calcular el nuevo precio con las nuevas fechas y la habitación actual
        let price = room.price * totalDays;

        // Crear el objeto de actualización con las nuevas fechas y el nuevo precio
        let updateData = {
            entryDate,
            departureDate,
            total: price
        };
        console.log(updateData)


        //actualizar
        let reservationUpdate = await Reservation.findOneAndUpdate(
            { _id: reservationId },
            updateData,
            { new: true }
        )
        if (!reservationUpdate) return res.status(400).send({ message: 'Usuario no actualizo' })
        return res.send({ message: 'Usuario actualizado', reservationUpdate })
    } catch (err) {
        console.log(err)
    }
}

//delete
exports.deleteReservation = async (req, res) => {
    try {
        //obtener id
        let reservationId = req.params.id

        //ver si existe reservacion
        let reservatationExist = await Reservation.findById(reservationId)
        if (!reservatationExist) return res.status(404).send({ message: 'Reservacion no existe' })

        let reservation = await Reservation.findById(reservationId);


        //cambiar el estado de la habitacion
        let room = await Room.findById(reservation.room)
        room.availability = 'libre'
        await room.save()

        //eliminar
        let reservationDelete = await Reservation.findOneAndDelete({ _id: reservationId })
        if (!reservationDelete) return res.status(400).send({ message: 'Reservacion no cancelada' })
        let habitacion = await Room.findById(reservationDelete.room)
        return res.send({ message: `Reservacion de ${habitacion.name} cancelada` })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ message: 'Error al cancelar la reservacion', err })
    }
}

//obtener
exports.getReservation = async (req, res) => {
    try {
        let reservation = await Reservation.find().populate('room', 'name').populate('user', 'name')
        return res.send({ message: 'Reservaciones encontradas', reservation })
    } catch (err) {
        console.log(err)
    }
}

exports.getReservatinoUser = async(req, res)=>{
    try {
        let userToken = req.user.sub
        let reservacion = await Reservation.find({ user: userToken }).populate('room', 'name')
        return res.send({message:'Reservacion encontrada', reservacion})
    } catch (err) {
        console.log(err)
    }
}