import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import { Outlet, Link } from 'react-router-dom'
import './DashboardStyle.css'


export const DashboardPage = () => {
  const { setLoggedIn, dataUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <><div className='dashboard'>
      <div id='body'>
        <section id='sidebar'>
          <ul className='side-menu top'>

            <a className='d-flex text-decoration-none mt-1 aling-items-center text-white'>
              <span className='fs-4 d-none d-sm-inline'> Tribago - KS</span>
            </a>

            <li className='nav-item'>
              <Link to='rooms'>
                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Habitaciones</span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='reservations'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Reservaciones</span>

              </Link>
            </li>

            <li className='nav-item'>
              <Link to='bills'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Facturas</span>

              </Link>
            </li>

            <li className='nav-item'>
              <Link to='events'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Eventos</span>

              </Link>
            </li>

            <li className='nav-item'>
              <Link to='services'>

                <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Servicios adicionales</span>

              </Link>
            </li>

            {/* si es owner mostrar solo esto */}
            {
              dataUser.role == 'OWNER' ? (
                <>
                  <li className='nav-item'>
                    <Link to='hotels'>

                      <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Hotel</span>

                    </Link>
                  </li>

                  <li>

                    <Link to='users'>

                      <i className='fs-5 fa fa-guage'></i><span className='fs-4 d-none d-sm-inline'>Users</span>

                    </Link>

                  </li>
                </>
              ) : <></>
            }
            {/* boton */}
            <button onClick={logOut} type="button" className="btn btn-danger btn-lg ">Cerrar sesión</button>
          </ul>
        </section>

        <section id='content'>
          <nav>
            <a></a>
          </nav>
          <Outlet></Outlet>
        </section>

        {/* boton */}
        <button onClick={logOut} type="button" className="btn btn-danger btn-lg ">Cerrar sesión</button>


      </div>
    </div>
    </>
  )
}
