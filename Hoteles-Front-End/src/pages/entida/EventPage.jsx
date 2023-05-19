import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CardEvent } from '../../components/cards/CardEvent'
import { AddEvent } from '../../components/Add/AddEvent'
import './Boton.css'

export const EventPage = () => {
  const [event, setEvent] = useState([{}])

  const getEvents = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/event/get')
      if (data.events) {
        setEvent(data.events)
        console.log(data.events)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => getEvents, [])

  return (
    <>
      <AddEvent />
      <main>
        <div className="left binding color">
          Eventos
        </div>
        <div className='row g-0 justify-content-center'>
          {
            event.map(({ _id, name, description, dateEvent }, i) => {
              return (
                <CardEvent
                  key={i}
                  _id={_id}
                  title={name}
                  description={description}
                  dateEvent={dateEvent}
                ></CardEvent>
              )
            })
          }
        </div>
        <button className='btn btn-success floating-button' data-bs-toggle="modal" data-bs-target="#myModal">Agregar</button>
      </main>
    </>
  )
}
