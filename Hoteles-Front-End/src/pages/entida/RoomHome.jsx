import React, { useEffect, useState } from 'react'
import { CardRoomHome } from '../../components/cards/CardRoomHome'
import axios from 'axios'

export const RoomHome = () => {
    const [rooms, setRoom] = useState([{}])

    /* obtener solo habitaciones que este libres */
    const roomLi = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/room/getRoomLi')
            if (data.rooms) {
                setRoom(data.rooms)
                console.log(data.rooms)
            }
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => { roomLi() }, [])

    return (
        <>
            <main>
                <div className='row g-0 justify-content-center'>
                    {
                        rooms.map(({ _id, name, price }, i) => {
                            return (
                                <CardRoomHome
                                    key={i}
                                    _id={_id}
                                    name={name}
                                    price={price}
                                >
                                </CardRoomHome>
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}
