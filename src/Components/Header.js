import React from 'react'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/Header.css'

function Header({userType='', setRole, setUserType}) {
    const history = useHistory();
    

    const logOut = () => {
        window.localStorage.removeItem('api_token')
        window.localStorage.removeItem('role')
        setRole('')
        setUserType('')
        history.push('/login')
    }
    
    let logoutButton
    if(userType !== '') {
        logoutButton = <Button variant='link' onClick={logOut} className="logout-button">Logout</Button>
    }

    return (
        <>
            <nav className="header">
                <div className="header-container">
                    <h1 className="header-logo">ITEH CRM 2021</h1>
                    <ul>
                        <li className="header-item-view">
                            {userType}
                        </li>
                        <li className="header-item-logout">
                            {logoutButton}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
