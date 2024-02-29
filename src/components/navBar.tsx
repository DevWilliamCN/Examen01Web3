import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logoPM (1).png';
import '../styles/index.css'; 

const NavBar = () => {
  return (
      <div className="container"> 
        <Link className="navbar-brand" to="/"> 
          <img src={logo} alt="Logo Pokémon" className="logo" /> 
        </Link>
      </div>
    
  );
}

export default NavBar;
