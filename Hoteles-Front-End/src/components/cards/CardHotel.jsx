import axios from 'axios'
import React from 'react'
import { UpHotel } from '../update/UpHotel'

export const CardHotel = ({ _id, title, admin, address, phone, email }) => {

  const elimHotel = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/hotel/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <UpHotel _id={_id}></UpHotel>
        <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{admin}</p>
          <p className='card-text'>{address}</p>
          <p className='card-text'>{phone}</p>
          <p className='card-text'>{email}</p>

          <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myHotel">Editar</button>
          <button className='btn btn-danger' onClick={()=> elimHotel(_id) }>Eliminar</button>
        </div>
      </div>
    </>
  )
}
