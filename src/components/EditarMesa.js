import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditarMesa({ backendUrl }) {
  const { id } = useParams();
  const [mesa, setMesa] = useState({});

  useEffect(() => {
    const fetchMesa = async () => {
      try {
        const response = await fetch(`http://localhost:8080/mesas/${id}`);
        const data = await response.json();
        setMesa(data);
      } catch (error) {
        console.error('Error al obtener los datos de la mesa:', error);
      }
    };
    fetchMesa();
  }, [id, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/mesas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mesa),
      });

      if (response.ok) {
        alert('Mesa actualizada con éxito');
      } else {
        alert('Error al actualizar la mesa');
      }
    } catch (error) {
      console.error('Error al actualizar la mesa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Mesa</h2>
      <input
        type="text"
        value={mesa.nombre || ''}
        onChange={(e) => setMesa({ ...mesa, nombre: e.target.value })}
        placeholder="Nombre de la mesa"
        required
      />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}

export default EditarMesa;