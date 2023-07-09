import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddReservation = ({_id}) => {
    const title = "Agregar Reservacion"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        entryDate: '',
        departureDate: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    
    const addReservacion = async()=>{
        try {
            console.log(form)
            form.room = _id
            const {data} = await axios.post('http://localhost:3000/reservation/save', form, {headers:headers})
            alert(data.message)            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="modal" tabIndex="-1" id="myReservation">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* titulo */}
                        <div className='modal-header'>
                            <h1 className="modal-title">{title}</h1>
                        </div>

                        {/* formulario */}
                        <div className='modal-body'>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Fecha de entrada</label>
                                <input onChange={handleChange} name='entryDate' id='inputName' type="date" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Fecha de salida</label>
                                <input onChange={handleChange} name='departureDate' id='inputDescription' type="date" className="form-control" required />
                            </div>
                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addReservacion()} type="submit" className="btn btn-primary">Add Reservation</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
