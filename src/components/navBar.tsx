import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logoPM (1).png';
import '../styles/index.css'; 

const NavBar = () => {
  return (
      <div className="container"> {/* Utiliza un contenedor para mejor control del layout */}
        <Link className="navbar-brand" to="/"> {/* Posiciona el logo a la izquierda */}
          <img src={logo} alt="Logo Pokémon" className="logo" /> {/* Establece estilos para el logo en NavBar.css */}
        </Link>
        {/* Si tienes más elementos en tu NavBar, colócalos aquí */}
      </div>
    
  );
}

export default NavBar;
