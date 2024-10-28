import React, { useState, useEffect } from 'react';
import PayPalButton from './PayPalButton'; // Componente para el botón de PayPal

function ReservaForm({ backendUrl, menus }) {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [personas, setPersonas] = useState('');
  const [menuSeleccionado, setMenuSeleccionado] = useState('');
  const [pagoRealizado, setPagoRealizado] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [pagoCompletado, setPagoCompletado] = useState(false);
  const [amount, setAmount] = useState(50); // Inicializamos con un monto predeterminado

  // Usar useEffect para actualizar el monto cuando cambie el número de personas
  useEffect(() => {
    // Ejemplo: 50 dólares base + 10 dólares por cada persona extra
    const montoBase = 50;
    const montoPorPersona = 10;
    const total = montoBase + (personas > 0 ? (personas - 1) * montoPorPersona : 0);
    setAmount(total);
  }, [personas]);

  // Simulación de la reserva
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const reservaData = {
      nombre,
      fecha,
      personas,
      menuSeleccionado,
    };

    // Simulamos un retraso en la respuesta del backend
    setTimeout(() => {
      console.log('Reserva simulada:', reservaData);
      alert('Reserva simulada con éxito');
      setReservaConfirmada(true); // Marcar la reserva como confirmada
    }, 1000); // Simulamos un retraso de 1 segundo
  };

  const handlePagoExitoso = (details) => {
    console.log('Pago completado con éxito:', details);
    setPagoCompletado(true); // Marcar el pago como completado
  };

  return (
    <section className="reserva-form">
      <h2>Reservar Mesa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Número de personas"
          value={personas}
          onChange={(e) => setPersonas(e.target.value)}
          required
        />

        {/* Menú personalizado */}
        <select
         value={menuSeleccionado}
         onChange={(e) => setMenuSeleccionado(e.target.value)}
          required
>
        <option value="">Seleccionar Menú</option>
         {menus && Array.isArray(menus) && menus.length > 0 ? (
          menus.map((menu) => (
          <option key={menu.id} value={menu.id}>
         {menu.nombre}
        </option>
    ))
  ) : (
    <option disabled>Cargando menús...</option>
  )}
</select>

        {/* Checkbox para pago anticipado */}
        <div>
          <input
            type="checkbox"
            checked={pagoRealizado}
            onChange={() => setPagoRealizado(!pagoRealizado)}
          />
          <label>¿Desea realizar un pago anticipado?</label>
        </div>

        <button type="submit">Reservar</button>
      </form>

      {/* Mostrar el botón de PayPal después de confirmar la reserva y si el pago anticipado está activado */}
      {reservaConfirmada && pagoRealizado && !pagoCompletado && (
        <div>
          <h3>Total a pagar: ${amount}</h3>
          <PayPalButton amount={amount} onSuccess={handlePagoExitoso} />
        </div>
      )}

      {/* Mensaje de pago completado */}
      {pagoCompletado && (
        <p className="mensaje-confirmacion">Pago completado con éxito. ¡Gracias por su reserva!</p>
      )}
    </section>
  );
}

export default ReservaForm;