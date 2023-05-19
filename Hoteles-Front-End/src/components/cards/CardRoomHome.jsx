import axios from 'axios'
import React from 'react'
import { AddReservation } from '../add/AddReservation'


export const CardRoomHome = ({_id, name, price}) => {

  return (
    <>
    <AddReservation _id={_id}/>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <p className='card-text'>{name}</p>
          <p className='card-text'>{price}</p>
          <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#myReservation" >Reservacion</button>
        </div>
      </div>
    </>
  )
}
