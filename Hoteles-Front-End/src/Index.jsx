import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { NotFound } from './NotFound'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPAge'
import { DashboardPage } from './pages/Dashboard/DashboardPage'
import { ProUser } from './pages/ProUser/ProUser'

import { BillPage } from './pages/entida/BillPage'
import { UserPage } from './pages/entida/UserPage'
import { RoomPage } from './pages/entida/RoomPage'
import { HotelPage } from './pages/entida/HotelPage'
import { EventPage } from './pages/entida/EventPage'
import { ReservationPage } from './pages/entida/ReservationPage'
import { ServicePage } from './pages/entida/ServicePage'


export const AuthContext = createContext();


export const Index = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [dataUser, setDataUser] = useState({
        name: '',
        username: '',
        role: ''
    })

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) setLoggedIn(true)
    }, [])


    const routes = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            errorElement: <NotFound />,
            children: [
                {
                    path: '/',
                    element: <HomePage></HomePage>
                },
                {
                    path: '/login',
                    element: <LoginPage />,
                },
                {
                    path: '/register',
                    element: <RegisterPage />,
                },
                {
                    path: '/account',
                    element: <ProUser/>
                },
                {
                    path: '/dashboard',
                    element: dataUser.role == "ADMIN" || dataUser.role == 'OWNER' ? <DashboardPage /> : <HomePage />,
                    children: [
                        {
                            path: 'bills',
                            element: <BillPage />
                        },
                        {
                            path: 'rooms',
                            element: <RoomPage />
                        },
                        {
                            path: 'users',
                            element: <UserPage />
                        },
                        {
                            path: 'events',
                            element: <EventPage/>
                        },
                        {
                            path: 'services',
                            element: <ServicePage/>
                        },
                        {
                            path: 'reservations',
                            element: <ReservationPage/>
                        },
                        {
                            path: 'hotels',
                            element: <HotelPage/>
                        }
                    ]
                },
            ],
        },
    ]);


    /*     const routes = createBrowserRouter([
            {
                path: '/',
                element: <App/>,
                errorElement: <NotFound/>,
                children: [
                    {
                        path:'/home',
                        element:<HomePage></HomePage>
                    },
                    {
                        path: '/login',
                        element: <LoginPage/>
                    },
                    {
                        path: '/register',
                        element: <RegisterPage/>
                    },
                    {
                        path: '/dashboard',
                        element:  loggedIn ?  <DashboardPage/>  : <LoginPage/>,
                        children:[
                            {
                                
                            }
    
                        ]
                    }
                ]
            }
        ]) */

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
            <RouterProvider router={routes} />
        </AuthContext.Provider>
    )
}