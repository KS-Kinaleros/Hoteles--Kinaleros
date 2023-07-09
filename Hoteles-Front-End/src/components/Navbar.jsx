import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Index'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container">
                    {/* para tener un logo */}
                    <a className="navbar-brand me-2" onClick={() => navigate('/')}>
                            <img src="/logo.png" height="55" alt="" loading="lazy" style={{ marginTop: '-1px' }} />
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarButtonsExample">
                        {/* poner botones con opciones */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Hoteles</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Habitaciones</a>
                            </li>
                        </ul>


                        <div className="d-flex align-items-center">
                            {loggedIn ? (
                                <>
                                <Link to='/account'>
                                    <button className="btn btn-outline-secondary mx-2">
                                        Su cueta
                                    </button>
                                </Link>
                                 <button type="button" className="btn btn-primary me-3" onClick={logOut}>
                                    Logout
                                </button>
                                </>
                               
                                
                            ) : (
                                <>
                                    <Link to="/login">
                                        <button type="button" className="btn btn-primary px-3 me-2">
                                            Login
                                        </button>
                                    </Link>

                                    <Link to="/register">
                                        <button type="button" className="btn btn-success me-3">
                                            Sign up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
