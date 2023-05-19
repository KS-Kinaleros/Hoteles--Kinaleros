import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const UpdateUser = () => {
    const title = 'Actualizar Usuario'
    const [users, setUsers] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

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

    const getUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getUserId', { headers: headers })
            if (data.users) {
                setUsers(data.users)
                console.log(data.users)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const updateUSS = async () => {
        try {
            const { data } = await axios.put('http://localhost:3000/user/updateUser', form, { headers: headers })
            alert(data.message)
        } catch (err) {
            console.log(err)
            alert(err.response.data.message)
        }
    }

    useEffect(() => getUsers, [])

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
                                <input onChange={handleChange} value={users.name} name='name' type="text" className="form-control" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Surname</label>
                                <input onChange={handleChange} value={users.surname} name='surname' type="text" className="form-control" required />
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
                                <label htmlFor="" className="form-label">Phone</label>
                                <input onChange={handleChange} name='phone' type="number" className="form-control" required />
                            </div>

                            {/* botones para cancelar o agregar */}
                            <div className='modal-footer'>
                                <button onClick={() => updateUSS()} type="submit" className="btn btn-primary">Update</button>
                                <button type="submit" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
