import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UpReservation = ({_id}) => {
  const title = "Editar Reservacion"

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

  const upReservation = async () => {
    try {
      const { data } = await axios.put(`http://localhost:3000/reservation/${_id}`, form)
    } catch (err) {
      console.log(err)
    }
  }

  return (

    <>

    </>
  )
}
