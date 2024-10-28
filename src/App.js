import React, { useState } from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import ReservaForm from './components/ReservaForm'; 
import ListaMesas from './components/ListaMesas';
import EditarMesa from './components/EditarMesa';
import ListaReservas from './components/ListaReservas';  // Componente nuevo
import Header from './components/Header'; 
import './styles.css';
import './App.css'; 

function App() {
  const [rol, setRol] = useState('cliente'); // Control del estado del rol

  const menus = [
    { id: 1, nombre: 'Menú 1' },
    { id: 2, nombre: 'Menú 2' },
  ];

  return (
    <Router>
      <div className="App">
        <Header rol={rol} setRol={setRol} /> {/* Pasar rol y setRol a Header */}
        <Routes>
          {/* Ruta principal para los clientes */}
          <Route path="/" element={<ReservaForm backendUrl="https://mi-backend.com" menus={menus} />} />
          
          {/* Ruta para ver mesas, accesible para todos */}
          <Route path="/mesas" element={<ListaMesas backendUrl="https://tu-backend-url.com" />} />

          {/* Rutas protegidas para el rol de administrador */}
          {rol === 'admin' ? (
            <>
              {/* Ver reservas solo si es admin */}
              <Route path="/reservas" element={<ListaReservas backendUrl="https://tu-backend-url.com" />} />
              {/* Editar mesa solo si es admin */}
              <Route path="/editar-mesa/:id" element={<EditarMesa backendUrl="https://tu-backend-url.com" />} />
            </>
          ) : (
            // Si el rol no es admin, redirigir al inicio
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;