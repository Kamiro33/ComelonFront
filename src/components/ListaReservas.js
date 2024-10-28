import React, { useState, useEffect } from 'react';

function ListaReservas({ backendUrl }) {
  const [reservas, setReservas] = useState([]);

  // Obtener todas las reservas desde el backend
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(`http://localhost:8080/reservas`);
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };
    fetchReservas();
  }, [backendUrl]);

  return (
    <div className="lista-reservas">
      <h2>Lista de Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.id}>
            <strong>Nombre:</strong> {reserva.nombre}, 
            <strong> Mesa:</strong> {reserva.mesa}, 
            <strong> Fecha:</strong> {reserva.fecha}, 
            <strong> Personas:</strong> {reserva.personas}, 
            <strong> Menú:</strong> {reserva.menuSeleccionado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaReservas;