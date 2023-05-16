'use strict'

const { trusted } = require('mongoose')
const Event = require('./event.model')

exports.test = (req, res) => {
    res.send({ message: 'Test event is running' })
}

//guardar
exports.addEvent = async (req, res) => {
    try {
        //obtener la data
        let data = req.body
        let existEvent = await Event.findOne({ name: data.name })

        if (existEvent) return res.send({ message: 'Evento ya creado' })
        let event = new Event(data)
        await event.save({runValidators: trusted})
        return res.status(201).send({ message: 'Evento creado' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:'Error al guardar', err})
    }
}

//update
exports.updateEvent = async (req, res) => {
    try {
        //obtener id
        let eventId = req.params.id
        //obtener data
        let data = req.body
        //validar que exista
        //actualizar
        let eventUpdate = await Event.findOneAndUpdate(
            { _id: eventId },
            data,
            { new: true, runValidators: true }
        )
        if(!eventUpdate) return res.status(400).send({message:'Evento no actualizo'})
        return res.send({message:'Evento actualizo', eventUpdate})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Error al actualizar", err})
    }
}

//eliminar
exports.deleteEvent = async (req, res) => {
    try {
        //obtener id
        let eventId = req.params.id
        //eliminar
        let eventDelete = await Event.findOneAndDelete({_id: eventId})
        if(!eventDelete) return res.status(404).send({message:'Evento no eliminado'})
        return res.send({message:`Evento ${eventDelete.name} eliminado`})
    } catch (err) {
        console.log(err)
    }
}

//obtener eventos
exports.getEvent = async (req, res) => {
    try {
        let events = await Event.find()
        return res.send({message:'Eventos encontrados:', events})
    } catch (err) {
        console.log(err)
    }
}