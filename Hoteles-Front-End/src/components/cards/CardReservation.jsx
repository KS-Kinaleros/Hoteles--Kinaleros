import axios from 'axios'
import React from 'react'

export const CardReservation = ({_id, title, user, total}) => {

  const elimReservation = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/reservation/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
        <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{user}</p>
          <p className='card-text'>{total}</p>

          <button className='btn btn-warning' >Editar</button>
          <button className='btn btn-danger' onClick={()=> elimReservation(_id) }>Eliminar</button>
        </div>
      </div>
    </>
  )
}
