import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpEvent = ({_id}) => {
  const title = "Editar Evento"

  const [form, setForm] = useState({
    name: '',
    description: '',
    typeEvent: '',
    dateEvent: '',
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const upEvent = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3000/event/update/${_id}`, form)
      alert(data.message)
    } catch (err) {
      console.log(err)
      alert(err.response.data.message)
    }
  }

  return (
    <>
      <div className="modal" tabIndex="-1" id="myEvent">
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
                <input onChange={handleChange} name='name' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Description</label>
                <input onChange={handleChange} name='description' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">tipo de evento</label>
                <input onChange={handleChange} name='typeEvent' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">dateEvent</label>
                <input onChange={handleChange} name='dateEvent' type="date" className="form-control" required />
              </div>

              {/* botones para cancelar o agregar */}
              <div className='modal-footer'>
                <button onClick={() => upEvent()} type="submit" className="btn btn-primary">Update Event</button>
                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
