import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { auth } from '../../config/firebase'
import './Navbar.scss'

type NavbarProps = {
  user: any
}

const Navbar = (props: NavbarProps) => {
  const router = useHistory()
  const { uid, photoURL, displayName } = props.user
  const logout = () => {
    auth.signOut()
    router.push('/login')
  }
  return (
    <nav>
      <div className="container nav-inner">
        <div className="nav-brand">
          <NavLink to="/">AAQ</NavLink>
        </div>
        <ul>
          {uid ? (
            <React.Fragment>
              {/* <li>
                <div className="user">
                  <div className="avatar" style={{ backgroundImage: `url('${photoURL}')` }}></div>
                  {displayName}
                </div>
              </li> */}
              <li>
                <NavLink to={`/history/${uid}`}>Quizzes History</NavLink>
              </li>
              <li>
                <NavLink to={`/u/${uid}`}>Profile</NavLink>
              </li>
              <li className="pointer" onClick={logout}>
                Logout
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Signup</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
