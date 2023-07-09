'use strict'

const User = require('./user.model')
const { validateData, encrypt, checkPassword } = require('../utils/validate');
const { createToken } = require('../services/jwt');

exports.test = (req, res) => {
    res.send({ message: 'Test user is running' })
}

exports.ownerDef = async (req, res) => {
    try {
        let data = {
            name: "KS",
            surname: "Kinaleros",
            username: "kinaleros",
            email: 'kinaleros@',
            password: "owner",
            phone: "42479250",
            role: "Owner"
        }
        data.password = await encrypt(data.password)
        let existUser = await User.findOne({ name: "KS" })
        if (existUser) return console.log("Creador de la app ya ha sido creado")
        let defUser = new User(data)
        await defUser.save()
        return console.log("Creador de la app creado correctamente")
    } catch (error) {
        console.error(err)
    }
}

//login
exports.login = async (req, res) => {
    try {
        //obtener data
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials)
        if (msg) return res.status(400).send(msg)
        //validar que si exista
        let user = await User.findOne({ username: data.username })
        //validar la contraseña
        if (user && await checkPassword(data.password, user.password)) {
            let userLogged = {
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await createToken(user)
            return res.send({ message: "Usuario logeado satisfactoriamente", token, userLogged })
        }
        return res.status(400).send({ message: "invalid credentials" })
    } catch (err) {
        console.error(err)
    }
}

//guardar
exports.addUser = async (req, res) => {
    try {
        let data = req.body

        let existUser = await User.findOne({ name: data.name })
        if (existUser) return res.status(400).send({ message: 'Usuario ya creado' })

        let params = {
            password: data.password
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        data.role = "CLIENT"
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.status(201).send({ message: 'Usuario creado' })
    } catch (err) {
        console.log(err)
    }
}

exports.addAdmin = async (req, res) => {
    try {
        let data = req.body
        let params = {
            password: data.password
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        data.role = "ADMIN"
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.status(201).send({ message: 'Admin creado' })
    } catch (err) {
        console.log(err)
    }
}

//update
exports.updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let data = req.body

        let userDlete = await User.findOne({ _id: userId })
        if (userDlete.role == "OWNER") {
            return res.status(403).send({ message: 'No se puede editar al dueño del programa' })
        }

        /* let token = req.user.sub;
        if (userId != token) return res.status(500).send({ message: "No tienes permiso para realizar esta accion" }) */
        if (data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' });
        let userUpdated = await User.findOneAndUpdate(
            { _id: userId },
            data,
            { new: true }
        )
        if (!userUpdated) return res.status(404).send({ message: 'User not found and not updated' });
        return res.send({ message: 'User updated', userUpdated })
    } catch (err) {
        console.log(err)
    }
}

//update por token
exports.updateToken = async (req, res) => {
    try {
        let userToken = req.user.sub
        let data = req.body

        if (data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({ message: 'Have submitted some data that cannot be updated' });
        let userUp = await User.findOneAndUpdate(
            { _id: userToken },
            data,
            { new: true }
        )
        if (!userUp) return res.status(404).send({ message: 'User not found and not updated' });
        return res.send({ message: 'User updated', userUp })

    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: " Error getting users", error: err })
    }
}


//delete
exports.deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        /* let token = req.user.sub;
        if(userId != token) return res.status(500).send({message: "No tienes permiso para realizar esta accion"}) */
        //eliminar el usuario

        let userDlete = await User.findOne({ _id: userId })
        if (userDlete.role == "OWNER") {
            return res.status(403).send({ message: 'No se puede eliminar al dueño del programa' })
        }


        let userDelete = await User.findByIdAndDelete({ _id: userId })
        if (!userDelete) return res.send({ message: "la cuenta no fue encontrado y por ende no eliminada" })
        return res.send({ message: `Cuenta con username ${userDelete.username} fue eliminada satisfactoriamente` })

    } catch (err) {
        console.log(err)
    }
}

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find();
        return res.send({ message: 'User found', users })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: " Error getting users" })
    }
}

exports.getUserId = async (req, res) => {
    try {
        let userToken = req.user.sub
        let user = await User.findOne({ _id: userToken })
        if (!user) return res.status(404).send({ message: 'User Not Found' })
        return res.status(200).send({ user })
    } catch (err) {
        console.log(err)
    }
}

exports.getAdminUsers = async (req, res) => {
    try {
      const adminUsers = await User.find({ role: "admin" });
      return res.send({ message: "Admin users found",  adminUsers });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Error getting admin users" });
    }
  };