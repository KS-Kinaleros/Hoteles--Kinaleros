import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardHotel } from '../../components/cards/CardHotel'
import { AddHotel } from '../../components/Add/AddHotel'
import './Boton.css'

export const HotelPage = () => {
  const [hotels, setHotels] = useState([{}])

  const getHotel = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/hotel/get')
      if (data.hotel) {
        setHotels(data.hotel)
        console.log(data.hotel)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getHotel, [])


  return (
    <>
      <AddHotel />
      <main>
        <div className="left binding color">
          Hoteles
        </div>
        <div className='row g-0 justify-content-center'>
          {
            hotels.map(({ _id, name, admin, address, phone, email }, i) => {
              return (
                <CardHotel
                  key={i}
                  _id={_id}
                  title={name}
                  admin={admin?.name}
                  address={address}
                  phone={phone}
                  email={email}
                ></CardHotel>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}
