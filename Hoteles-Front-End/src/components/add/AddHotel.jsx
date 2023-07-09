import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddHotel = () => {
    const title = "Agregar Hotel"

    const [users, setUsers] = useState([{}])
    const [service, setService] = useState([{}])
    const [event, setEvent] = useState([{}])

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
            let hotel = {
                name: document.getElementById('inputName').value,
                address: document.getElementById('inputAddress').value,
                phone: document.getElementById('inputTele').value,
                email: document.getElementById('inputEmail').value,
                admin: document.getElementById('inputAdmin').value,
                service: document.getElementById('inputService').value,
                event: document.getElementById('inputEvent').value
            }
            const { data } = await axios.post('http://localhost:3000/hotel/save', hotel)
            alert(data.message)
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

    const getService = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/extraService/get')
            if (data.extraService) {
                setService(data.extraService)
                /* console.log(data.extraService) */
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getEvent = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/event/get')
            if (data.events) {
                setEvent(data.events)
                /* console.log(data.events) */
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getAdmin = async()=>{
        try {
            const {data} = await axios.get('http://localhost:3000/user/getAd')
            if(data.adminUsers){
                setUsers(data.adminUsers)
                console.log(data.adminUsers)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getAdmin();
        getService();
        getEvent()
    }, [])

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
                                <input id='inputName' onChange={handleChange} name='name' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Direccion</label>
                                <input id='inputAddress' onChange={handleChange} name='description' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Telefono</label>
                                <input id='inputTele' onChange={handleChange} name='phone' type="number" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Correo</label>
                                <input id='inputEmail' onChange={handleChange} name='email' type="text" className="form-control" required />
                            </div>

                            {/* estos son con combobox */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Administrador</label>
                                {/* <input onChange={handleChange} name='price' type="number" className="form-control" required /> */}
                                <select className="form-control" name="client" id='inputAdmin'>
                                    <option value="">Seleccionar Admin</option>
                                    {
                                        users.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id} > {name} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Servicios</label>
                                {/* <input onChange={handleChange} name='price' type="number" className="form-control" required /> */}
                                <select className="form-control" name="client" id='inputService'>
                                    <option value="">Seleccionar Servicio</option>
                                    {
                                        service.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id} > {name} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Eventos</label>
                                {/* <input onChange={handleChange} name='price' type="number" className="form-control" required /> */}
                                <select className="form-control" name="client" id='inputEvent'>
                                    <option value="">Seleccionar Evento</option>
                                    {
                                        event.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id} > {name} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addHotel()} type="submit" className="btn btn-primary">Add hotel</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
