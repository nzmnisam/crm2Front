import React, { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Header.css'

function Header() {
   // const [whoIsLoggedIn, setWhoIsLoggedIn] = useState('')
    const [role, setRole] = useState()
    const history = useHistory();

    const logOut = () => {
        window.localStorage.removeItem('api_token')
        window.localStorage.removeItem('role')
        setRole('')
      //  setWhoIsLoggedIn('')
        history.push('/login')
    }
    
    useEffect(() => {
        const localRole = window.localStorage.getItem('role')
        console.log(localRole);
        if(localRole) {
            setRole(localRole)
        } else {
            setRole('')
        }
    })
    // useEffect(() => {
    //     function checkRole() {
    //         const localRole = window.localStorage.getItem('role')
    //         if(localRole) {
    //             setRole(role)
    //             if(localRole === 'manager') {
    //                 setWhoIsLoggedIn('Manager view')
    //             }
    //             if(localRole !== 'manager') {
    //                 setWhoIsLoggedIn('Employee view')
    //             }
    //         } else {
    //             setWhoIsLoggedIn('')
    //         }
    //     }
    //     window.addEventListener('storage', checkRole)
    //     return () => {
    //         window.removeEventListener('storage', checkRole)
    //     }
    // },[])
    return (
        <>
            <nav className="header">
                <div className="header-container">
                    <h1 className="header-logo">ITEH CRM 2021</h1>
                    <ul>
                        <li className="header-item-view">
                            {role}
                        </li>
                        <li className="header-item-logout">
                            <Button onClick={logOut} className="logout-button">Logout</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
