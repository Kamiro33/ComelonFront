import React, { useEffect, useState } from 'react';

function ListaMesas() {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeMesas = [
      { id: 1, numero: 5, capacidad: 4 },
      { id: 2, numero: 7, capacidad: 6 },
    ];

    setTimeout(() => {
      setMesas(fakeMesas);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Cargando mesas...</div>;
  }

  return (
    <div>
      <h1>Lista de Mesas</h1>
      {mesas.length > 0 ? (
        mesas.map((mesa) => (
          <div key={mesa.id}>
            <p>Mesa: {mesa.numero} - Capacidad: {mesa.capacidad}</p>
          </div>
        ))
      ) : (
        <p>No hay mesas disponibles.</p>
      )}
    </div>
  );
}

export default ListaMesas;