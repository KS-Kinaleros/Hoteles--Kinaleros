import axios from 'axios'
import React from 'react'
import { UpRoom } from '../update/UpRoom'

export const CardRoom = ({_id, name, availability, price}) => {

  const elimRoom = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/room/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <UpRoom _id={_id}></UpRoom>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <p className='card-text'>{name}</p>
          <p className='card-text'>{availability}</p>
          <p className='card-text'>{price}</p>
          <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myRoom">Editar</button>
          <button className='btn btn-danger' onClick={()=> elimRoom(_id) }>Eliminar</button>
        </div>
      </div>
    </>
  )
}
