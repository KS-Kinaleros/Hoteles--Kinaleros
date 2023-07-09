import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpUser = ({_id}) => {
  const title = "Editar Usuario"

  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    phone: ''
})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const upUser = async (_id) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/user/${_id}`, form)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="modal" tabIndex="-1" id="myUser">
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
                <label htmlFor="" className="form-label">Surname</label>
                <input onChange={handleChange} name='surname' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Username</label>
                <input onChange={handleChange} name='username' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Email</label>
                <input onChange={handleChange} name='email' type="text" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Password</label>
                <input onChange={handleChange} name='password' type="password" className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Phone</label>
                <input onChange={handleChange} name='phone' type="number" className="form-control" required />
              </div>

              {/* botones para cancelar o agregar */}
              <div className='modal-footer'>
                <button onClick={() => addAdmin()} type="submit" className="btn btn-primary">Update User</button>
                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
