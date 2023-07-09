import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardRoom } from '../../components/cards/CardRoom'
import { AddRoom } from '../../components/Add/AddRoom'
import './Boton.css'

export const RoomPage = () => {
  const [room, setRoom] = useState([{}])

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getRoomAd = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/room/getRoom', { headers: headers })
        setRoom(data.rooms)
        console.log(data.rooms)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {getRoomAd()}, [])

  return (
    <>
      <AddRoom></AddRoom>
      <main>
        <div className="left binding color">
          Habitaciones
        </div>

        <div className='row g-0 justify-content-center'>
          {
            room.map(({ _id, name, availability, price }, i) => {
              return (
                <CardRoom
                  key={i}
                  _id={_id}
                  name={name}
                  availability={availability}
                  price={price}
                >
                </CardRoom>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>

    </>

  )
}
