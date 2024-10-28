import React from 'react';
import { Link } from 'react-router-dom';

function Header({ rol, setRol }) {
  return (
    <header className="header">
      <h1>El Comelón</h1>
      <div className="nav">
        <nav>
          <Link to="/">Reservar</Link>
          <Link to="/mesas">Mesas</Link>
          {rol === 'admin' && (
            <>
              <Link to="/reservas">Ver Reservas</Link>
              <Link to="/editar-mesa/1">Editar Mesa</Link>
            </>
          )}
        </nav>
      </div>
      <div className="rol-selector">
        <button onClick={() => setRol('cliente')}>Cliente</button>
        <button onClick={() => setRol('admin')}>Administrador</button>
      </div>
    </header>
  );
}

export default Header;