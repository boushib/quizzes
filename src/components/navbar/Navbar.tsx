import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => (
  <nav>
    <div className="container nav-inner">
      <div className="nav-brand">
        <NavLink to="/">AAQ</NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Signup</NavLink>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar
