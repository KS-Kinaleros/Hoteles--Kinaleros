import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AddRoom = () => {
    const [hotel, setHotel] = useState([{}])

    const title = "Agregar Habitaciones"

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        hotel: '',
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }

    const addRoom = async () => {
        try {
            let room = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                price: document.getElementById('inputPrice').value,
                hotel: document.getElementById('inputHotel').value,
            }

            const { data } = await axios.post('http://localhost:3000/room/save', room)
            alert(data.message)
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

    const getHotel = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/hotel/get')
            if (data.hotel) {
                setHotel(data.hotel)
                console.log(data.hotel)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => { getHotel(); },
        [])

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

                            {/* combobox */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Hotel</label>
                                {/* <input onChange={handleChange} name='price' type="number" className="form-control" required /> */}
                                <select className="form-control" name="client" id='inputHotel'>
                                <option value="">Seleccionar hotel</option>
                                    {
                                        hotel.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id} > {name} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => addRoom()} type="submit" className="btn btn-primary">Add Cellar</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
