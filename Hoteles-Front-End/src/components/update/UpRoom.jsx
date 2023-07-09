import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpRoom = ({_id}) => {
  const title = "Editar Habitacion"

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const upRoom = async() =>{
    try {
      const {data} = await axios.put(`http://localhost:3000/room/update/${_id}`, form)
      alert(data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="modal" tabIndex="-1" id="myRoom">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* titulo */}
            <div className='modal-header'>
              <h1 className="modal-title">{title}</h1>
            </div>

            {/* formulario */}
            <div className='modal-body'>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Name</label>
                <input onChange={handleChange} name='name' id='inputName' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Description</label>
                <input onChange={handleChange} name='description' id='inputDescription' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Price</label>
                <input onChange={handleChange} name='price' id='inputPrice' type="number" className="form-control" required />
              </div>
              {/* botones para cancelar o agregar */}
              <div className='modal-footer'>
                <button onClick={() => upRoom()} type="submit" className="btn btn-primary">Update Room</button>
                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
