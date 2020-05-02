import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';
import { LoginContext } from '../../context/login-context'

const NavLinks = props => {

  const auth = useContext(LoginContext)

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>Community</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">Add Place</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth'>
            <button>Login</button>
          </NavLink>
        </li>
      )}
    </ul>
  )
};

export default NavLinks;