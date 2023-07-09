import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardReservation } from '../../components/cards/CardReservation'

import './Boton.css'

export const ReservationPage = () => {
  const [reservations, setReservations] = useState([{}])

  const getReservations = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/reservation/get')
      if (data.reservation) {
        setReservations(data.reservation)
        console.log(data.reservation)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=> getReservations, [])

  return (
    <>
      <main>
        <div className="left binding color">
          Reservaciones
        </div>
        <div className='row g-0 justify-content-center'>
          {
            reservations.map(({ _id, room, user, total }, i) => {
              return (
                <CardReservation
                  key={i}
                  _id={_id}
                  title={room?.name}
                  user={user?.name}
                  total={total}
                ></CardReservation>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button'>Agregar</button>
      </main>
    </>
  )
}
