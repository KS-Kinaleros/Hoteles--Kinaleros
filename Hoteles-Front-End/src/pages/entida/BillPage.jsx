import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardBill } from '../../components/cards/CardBill'
import './Boton.css'

export const BillPage = () => {
    const [bill, setBill] = useState([{}])

    const getBill = async () => {
        try {
            const { data } = await axios('http://localhost:3000/bill/get')
            console.log(data)
            if (data.bills) {
                setBill(data.bills)
                console.log(data.bills)
            }
        } catch (err) {
            console.log(err)

        }
    }


    useEffect(() => getBill, [])

    return (
        <>
            <main>
                <div className="left binding color">
                    Facturas
                </div>

                <div className='row g-0 justify-content-center'>
                    {
                        bill.map(({ _id, user, reservation }, i) => {
                            return (
                                <CardBill
                                    key={i}
                                    _id={_id}
                                    user={user?.name}
                                    reservation={reservation}
                                >
                                </CardBill>
                            )
                        })
                    }
                </div>
                <button className='btn btn-success floating-button'>Agregar</button>
            </main>

        </>
    )
}
