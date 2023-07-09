import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardService } from '../../components/cards/CardService'
import { AddService } from '../../components/Add/AddService'
import './Boton.css'

export const ServicePage = () => {
  const [services, setServices] = useState([{}])

  const getServices = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/extraService/get')
      if (data.extraService) {
        setServices(data.extraService)
        console.log(data.extraServiced)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getServices, [])

  return (
    <>
      <AddService />
      <main>
        <div className="left binding color">
          Servicios
        </div>
        <div className='row g-0 justify-content-center'>
          {
            services.map(({ _id, name, description, price }, i) => {
              return (
                <CardService
                  key={i}
                  _id={_id}
                  title={name}
                  description={description}
                  price={price}
                ></CardService>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}
