import axios from 'axios'
import React from 'react'
import { UpUser } from '../update/UpUser'

export const CardUser = ({ _id, title, surname, phone, email, role }) => {

  const elimUser = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/user/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  return (
    <>
    <UpUser _id={_id}></UpUser>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{surname}</p>
          <p className='card-text'>{phone}</p>
          <p className='card-text'>{email}</p>
          <p className='card-text'>{role}</p>

          <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myUser">Editar</button>
          <button className='btn btn-danger' onClick={() => elimUser(_id)}>Eliminar</button>
        </div>
      </div>
    </>
  )
}
