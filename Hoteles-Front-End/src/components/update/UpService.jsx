import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const UpService = ({ _id }) => {
    const title = 'Update Service'

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

    const upService = async () => {
        try {
            const { data } = await axios.put(`http://localhost:3000/extraService/update/${_id}`, form)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="modal" tabIndex="-1" id="myService">
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
                                <button onClick={()=> upService()} type="submit" className="btn btn-warning" >Update Service</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
