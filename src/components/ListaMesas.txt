import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListaMesas() {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    // Simular una llamada API
    axios.get('/api/mesas')
      .then(response => setMesas(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="lista-mesas">
      <h2>Lista de Mesas</h2>
      <ul>
        {mesas.map((mesa) => (
          <li key={mesa.id}>
            <strong>{mesa.numero}</strong> - Capacidad: {mesa.capacidad} -{' '}
            {mesa.disponible ? 'Disponible' : 'Ocupada'}{' '}
            <Link to={`/editar-mesa/${mesa.id}`}>Editar</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaMesas;