'use strict'

const Hotel = require('./hotel.model')
const User = require('../user/user.model')
const { validateData } = require('../utils/validate')

exports.test = (req, res) => {
    res.send({ message: 'Test hotel is running' })
}

//agregar
exports.addHotel = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        //ver si existe hotel y no crear duplicados
        let existHotel = await Hotel.findOne({ name: data.name })
        if (existHotel) return res.send({ message: 'Hotel ya creado' })

        //validar que el user que se agrega sea de rol admin
        let user = await User.findById({ _id: data.admin })
        if (!user || user.role !== 'ADMIN') return res.status(404).send({ message: 'El usuario no es administrador' })

        //guardar hotel
        let hotel = new Hotel(data)
        await hotel.save()
        return res.status(201).send({ message: "Hotel creado exitosamente" })
    } catch (err) {
        console.log(err)
        return res.status(404).send({ message: 'Error al crear hotel', error: err.message })
    }
}

//editar
exports.updateHotel = async (req, res) => {
    try {
        let hotelId = req.params.id
        let data = req.body
        let hotelUpdate = await Hotel.findOneAndUpdate(
            { _id: hotelId },
            data,
            { new: true }
        )
        if (!hotelUpdate) return res.status().send({ message: 'Hotel no actualizo' })
        return res.send({ message: `Hotel actualizo`, hotelUpdate })
    } catch (err) {
        console.log(err)
    }
}

//eliminar
exports.deleteHotel = async (req, res) => {
    try {
        let hotelId = req.params.id
        let deletedHotel = await Hotel.findOneAndDelete({ _id: hotelId });
        if (!deletedHotel) return res.status(404).send({ message: 'El Hotel no se pudo eliminar' });
        return res.send({ message: 'Hotel eliminado exitosamente' });
    } catch (err) {
        console.log(err)
    }
}

//obtener hoteles
exports.getHotels = async (req, res) => {
    try {
        let hotel = await Hotel.find().populate('admin', 'name')
        return res.send({ message: 'Hoteles Encontrados', hotel })
    } catch (err) {
        console.log(err)
    }
}

//buscar hotel por id
exports.getHotelId = async (req, res) => {
    try {
        //obter id
        let hotelId = req.params.id
        let hotel = await Hotel.findOne({ _id: hotelId })
        if (!hotel) return res.status(404).send({ message: 'hotel no encontrado' })
        return res.status(200).send({ hotel })
    } catch (err) {
        console.log(err)
    }
}

//buscar hotel por nombre
exports.searchName = async (req, res) => {
    try {
        let params = {
            name: req.body.name
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        let hotels = await Hotel.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({ hotels })
    } catch (err) {
        console.log(err)
        return res.status(404).send({ mesasge: 'Error al buscar el hotel', error: err.message })
    }
}

exports.searchAddress = async (req, res) => {
    try {
        let params = {
            address: req.body.address
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        let hotels = await Hotel.find({
            address: {
                $regex: params.address,
                $options: 'i'
            }
        })
        return res.send({ hotels })
    } catch (err) {
        console.log(err)
        return res.status(404).send({ mesasge: 'Error al buscar el hotel', error: err.message })
    }
}

