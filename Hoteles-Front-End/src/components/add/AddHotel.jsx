import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddHotel = () => {
    const title = "Agregar Hotel"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        admin: '',
        service: '',
        event: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const addHotel = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/hotel/save', form)
            alert(data.message)
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

    return (
        <>
<div className="modal" tabIndex="-1" id="myModal">
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
                                <label htmlFor="" className="form-label">Address</label>
                                <input onChange={handleChange} name='description' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Phone</label>
                                <input onChange={handleChange} name='phone' type="number" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Email</label>
                                <input onChange={handleChange} name='email' type="email" className="form-control" required />
                            </div>

                            {/* estos son con combobox */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Administrador</label>
                                <input onChange={handleChange} name='admin' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Service</label>
                                <input onChange={handleChange} name='service' type="text" className="form-control"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Event</label>
                                <input onChange={handleChange} name='event' type="text" className="form-control"/>
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addHotel()} type="submit" className="btn btn-primary">Add Cellar</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
