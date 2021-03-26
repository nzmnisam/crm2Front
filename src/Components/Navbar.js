import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'


function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <ul>
                        <li className="navbar-element">
                            <Link to="/Dashboard" className="navbar-link">DASHBOARD</Link>
                        </li>
                        <li className="navbar-element">
                            <Link to="/SearchLeads" className="navbar-link">SEARCH LEADS</Link>
                        </li>
                        <li className="navbar-element">
                            <Link to="/NewLead" className="navbar-link">NEW LEAD</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
