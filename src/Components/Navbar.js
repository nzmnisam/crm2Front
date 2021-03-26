import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'


function Navbar({role}) {
    let navLinks = [];

    if(role === 'manager') {
        navLinks.push(<Link to='/ManageUsers' className='navbar-link'>MANAGE EMPLOYEES</Link>)
        navLinks.push(<Link to='/RegisterUser' className='navbar-link'>ADD EMPLOYEE</Link>)
    } else {
        navLinks.push(<Link to="/SearchLeads" className="navbar-link">SEARCH LEADS</Link>)
        navLinks.push(<Link to="/NewLead" className="navbar-link">NEW LEAD</Link>
        )
    }
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul>
                        <li className="navbar-element">
                            <Link to="/Dashboard" className="navbar-link">DASHBOARD</Link>
                        </li>
                        <li className="navbar-element">
                           {navLinks[0]}
                        </li>
                        <li className="navbar-element">
                            {navLinks[1]}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
