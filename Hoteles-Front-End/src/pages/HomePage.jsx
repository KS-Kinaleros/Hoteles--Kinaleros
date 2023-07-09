import React, { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CardRoomHome } from '../components/cards/CardRoomHome';
import { RoomHome } from './entida/RoomHome';

export const HomePage = () => {
  return (
    <>
      <Navbar />

      //barra de busqueda

        <div className="d-flex justify-content-center mb-4 mt-5">
          <div className="input-group rounded" style={{ width: "1000px", height: '50px' }}>
            <input /* onChange={handleChange} */ name='name' type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            <span className="input-group-text border-0" id="search-addon">
              <button /* onClick={searchCellars} */><i className="fas fa-search"></i></button>
            </span>
          </div>
        </div>


      {/* carrusel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/home-slide1.jpg" className="d-block w-100" style={{ maxWidth: "5000px", maxHeight: "5000px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/img/home-slide2.jpg" className="d-block w-100" style={{ maxWidth: "5000px", maxHeight: "5000px" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="/img/home-slide3.jpg" className="d-block w-100" style={{ maxWidth: "5000px", maxHeight: "5000px" }} alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* card para reservacion */}
      <RoomHome/>

    </>
  )
}