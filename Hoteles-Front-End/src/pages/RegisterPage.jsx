import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export const RegisterPage = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        email: '',
        phone: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const register = async(e)=>{
        try{
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3000/user/save', form)
            if(data.message){
                alert(data.message)
                navigate('/login')
            }
        }catch(err){
            console.log(err)
            alert(err.response.data.message)
        }
    }

    return (
        <>
            <Navbar></Navbar>
            <section className="vh-100" style={{ backgroundColor: "#ad8762" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img  src='/img/register.jpeg ' alt="Register form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                    <span className="h1 fw-bold mb-0">Trivago - KS</span>
                                                </div>
                                                <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Crea tu cuenta</h5>


                                                {/* inputs */}
                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='name' type="text" className="form-control form-control-lg" placeholder='name' />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='surname' type="text" className="form-control form-control-lg" placeholder='surname' />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='username' type="text" className="form-control form-control-lg" placeholder='username' />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='email' type="email" className="form-control form-control-lg" placeholder='email' />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='password' type="password" className="form-control form-control-lg" placeholder='password' />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input onChange={handleChange}  name='phone' type="phone" className="form-control form-control-lg" placeholder='phone' />
                                                </div>

                                                {/* boton para agregar */}
                                                <div className="pt-1 mb-4">
                                                    <button onClick={(e) => register(e)} className="btn btn-dark btn-lg btn-block" type="button">Crear cuenta</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
