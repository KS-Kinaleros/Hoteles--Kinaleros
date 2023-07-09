'use strict'

const ExtraService = require('./extraService.model')

exports.test = (req, res)=>{
    res.send({message: 'Test extra service is running'})
}

//guardar
exports.addExtraService = async(req, res)=>{
    try {
        let data = req.body
        let existExtraService = await ExtraService.findOne({ name: data.name })
        if (existExtraService) return res.status(401).send({ message: 'Servicio extra ya creado' })
        let extraService = new ExtraService(data)
        await extraService.save()
        return res.status(200).send({ message: 'Servicio extra creado' })
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Error al guardar", err})
    }
}

//update
exports.updateExtraService = async(req, res)=>{
    try {
       //obtener id
       let extraServiceId = req.params.id
       //obtener data
       let data = req.body
       //validar que exista
       let extraServiceUpdate = await ExtraService.findOneAndUpdate(
           { _id: extraServiceId },
           data,
           { new: true }
       )
       if(!extraServiceUpdate) return res.status(400).send({message:'Servicio extra no actualizo'})
       return res.status(200).send({message:'Servicio extra actualizo', extraServiceUpdate}) 
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Error al actualizar", err})
    }
}

//delete
exports.deleteExtraService = async(req, res)=>{
    try {
        //obtener id
        let extraServiceId = req.params.id
        let extraServiceDelete = await ExtraService.findOneAndDelete({_id: extraServiceId})
        if(!extraServiceDelete) return res.status(400).send({message:'Servicio extra no eliminado'})
        return res.status(200).send({message:`Servicio extra ${extraServiceDelete.name} Eliminado`})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Error al eliminar", err})
    }
}

//obtener
exports.getExtraService = async(req, res)=>{
    try {
        let extraService = await ExtraService.find()
        return res.send({message: 'Servicios extra encontrados', extraService})
    } catch (err) {
        console.log(err)
    }
}