import axios from 'axios'
import React from 'react'
import { UpEvent } from '../update/UpEvent'

export const CardEvent = ({ _id, title, description, dateEvent }) => {

  const elimEvent = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/event/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <UpEvent _id={_id}></UpEvent>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>{dateEvent}</p>

          <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myEvent">Editar</button>
          <button className='btn btn-danger' onClick={() => elimEvent(_id)}>Eliminar</button>
        </div>
      </div>
    </>
  )
}
