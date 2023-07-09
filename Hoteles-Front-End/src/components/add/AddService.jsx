import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddService = () => {
    const title = "Agregar Servicios"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const addService = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/extraService/save', form)
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
                                <label htmlFor="" className="form-label">Descripcion</label>
                                <input onChange={handleChange} name='description' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Precio</label>
                                <input onChange={handleChange} name='price' type="number" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addService()} type="submit" className="btn btn-primary">Add Service</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
