import axios from 'axios'
import React from 'react'
import { UpService } from '../update/UpService'

export const CardService = ({_id, title, description, price}) => {

  const elimService = async (_id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/extraService/delete/${_id}`)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <UpService _id={_id}></UpService>
    <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <p className='card-text'>{price}</p>
          <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#myService">Editar</button>
          <button className='btn btn-danger' onClick={()=> elimService(_id) }>Eliminar</button>
        </div>
      </div>
    </> 
  )
}
