import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import {UpdateUser} from './UpdateUser'

export const ProUser = () => {
    const [user, setUser] = useState([{}])
    const [reservation, setReservation] = useState([{}])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getUserId = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/user/getUserId', { headers: headers })
            if (data.user) {
                setUser(data.user)
                console.log(data.user)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const getReservation = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/reservation/getReU', { headers: headers })
            if (data.reservacion) {
                setReservation(data.reservacion)
                console.log(data.reservacion)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const elimRe = async(_id)=>{
        try {
            const {data} = await axios.delete(`http://localhost:3000/reservation/delete/${_id}`)
            alert(data.message)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getUserId();
        getReservation();
    }
        , [])

    return (
        <>
            <Navbar></Navbar>

            <UpdateUser></UpdateUser>

            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-12 col-xl-4">
                            <div className="card " style={{ borderRadius: '15px', width: '500px' }}>
                                <div className="card-body text-center">
                                    <div className="mt-3 mb-4">
                                        <img src="/avatar.png" className="rounded-circle img-fluid" style={{ width: '100px' }} alt="Profile" />
                                    </div>

                                    {/* nombres */}
                                    <h4 className="mb-2">Nombre: {user.name}</h4>
                                    <h4 className="mb-2">Surname: {user.surname}</h4>
                                    <h4 className="mb-2">Emaill: {user.email}</h4>
                                    <h4 className="mb-2">Phone:{user.phone}</h4>


                                    {/* reservaciones */}
                                    <h4 className="mt-5 mb-4">Reservaciones:</h4>
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Entrada</th>
                                                    <th>Salida</th>
                                                    <th>Room</th>
                                                    <th>total</th>
                                                    <th>acciones</th>
                                                    {/* Otros encabezados de columna */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    reservation.map(({ _id, entryDate, departureDate, room, total }, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{entryDate}</td>
                                                                <td>{departureDate}</td>
                                                                <td>{room?.name}</td>
                                                                <td>{total}</td>
                                                                <td> <button onClick={()=> elimRe(_id)} className='btn btn-danger'>Eliminar</button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                    {/* actualizar algun datao */}
                                    <button type="button" className="btn btn-primary btn-rounded btn-lg me-3" data-bs-toggle="modal" data-bs-target="#myUser">
                                        Actualizar
                                    </button>
                                    <button type='button' className='btn btn-danger btn-rounded btn-lg'>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
