import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardUser } from '../../components/cards/CardUser'
import { AddUser } from '../../components/Add/AddUser'
import './Boton.css'

export const UserPage = () => {
  const [users, setUser] = useState([{}])

  const getUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/user/get')
      if (data.users) {
        setUser(data.users)
        console.log(data.users)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getUsers, [])

  return (
    <>
      <AddUser />
      <main>
        <div className="left binding color">
          Usuarios
        </div>
        <div className='row g-0 justify-content-center'>
          {
            users.map(({ _id, name, surname, phone, email, role }, i) => {
              return (
                <CardUser
                  key={i}
                  _id={_id}
                  title={name}
                  surname={surname}
                  phone={phone}
                  email={email}
                  role={role}
                ></CardUser>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}
