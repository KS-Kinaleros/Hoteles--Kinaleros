import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddEvent = () => {
    const title = "Agregar Eventos"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

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

    const addEvent = async () => {
        try {
            const { data } = await axios.post('http://localhost:3000/event/save', form)
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
                                <label htmlFor="" className="form-label">Nombre</label>
                                <input onChange={handleChange} name='name' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Descripcion</label>
                                <input onChange={handleChange} name='description' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Tipo de Evento</label>
                                <input onChange={handleChange} name='typeEvent' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">dateEvent</label>
                                <input onChange={handleChange} name='dateEvent' type="date" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addEvent()} type="submit" className="btn btn-primary">Add Event</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
