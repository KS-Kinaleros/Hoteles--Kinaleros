import React from 'react'

export const CardBill = ({ _id, user, reservation }) => {
  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '20rem' }}>
        <div className="card-body">
          <h5 className='card-title'>{user}</h5>
          <p className='card-text'>{reservation}</p>
          <button className='btn btn-warning' >Editar</button>
          <button  className='btn btn-danger'>Eliminar</button>
        </div>
      </div>

      {/*       <div className="card text-dark bg-light mb-3" style={{ maxWidth: '18rem' }}>
        <div className="card-header">{title}</div>
        <div className="card-body">
          <h5 className="card-title">{user}</h5>
          <h5 className="card-title">{reservation}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className='btn btn-warning'>Editar</button>
          <button  className='btn btn-danger'>Eliminar</button>
        </div>
      </div> */}
    </>
  )
}
