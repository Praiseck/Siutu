import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reserva() {
  const [viajes, setViajes] = useState([]);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [cantidadAsientos, setCantidadAsientos] = useState(1);
  const [usuarioId] = useState(null); // Asegúrate de obtener el ID del usuario autenticado

  useEffect(() => {
    const obtenerViajes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/viajes');
        if (Array.isArray(response.data)) {
          setViajes(response.data);
        } else {
          console.error('La respuesta de la API no es un arreglo:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los viajes:', error);
      }
    };

    obtenerViajes();
  }, []);

  const handleViajeChange = (event) => {
    const viajeId = event.target.value;
    const viaje = viajes.find((v) => v.id === viajeId);
    setViajeSeleccionado(viaje);
  };

  const handleReserva = async () => {
    if (!viajeSeleccionado || !usuarioId) {
      console.error('Selecciona un viaje e inicia sesión para reservar.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/viajes', {
        viajeId: viajeSeleccionado.id,
        usuarioId,
        cantidadAsientos,
      });

      console.log('Reserva creada:', response.data);
      // Puedes agregar lógica para actualizar la vista, mostrar un mensaje de éxito, etc.
    } catch (error) {
      console.error('Error al crear la reserva:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)' 
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', 
        width: '400px', 
        textAlign: 'center' 
      }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Reservar un Viaje</h2>

        <h3 style={{ marginBottom: '10px', color: '#555' }}>Viajes Disponibles</h3>
        <select 
          value={viajeSeleccionado ? viajeSeleccionado.id : ''} 
          onChange={handleViajeChange}
          style={{
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        >
          <option value="">Selecciona un viaje</option>
          {viajes.map((viaje) => (
            <option key={viaje.id} value={viaje.id}>
              {viaje.lugarRecogida} - {viaje.lugarDestino} ({viaje.horaSalida})
            </option>
          ))}
        </select>

        {viajeSeleccionado && (
          <div>
            <h3 style={{ marginBottom: '10px', color: '#555' }}>Detalles del Viaje</h3>
            <p style={{ marginBottom: '5px', color: '#777' }}>Conductor: {viajeSeleccionado.conductorId}</p>
            <p style={{ marginBottom: '5px', color: '#777' }}>Tipo de Vehículo: {viajeSeleccionado.tipoVehiculo}</p>
            <p style={{ marginBottom: '5px', color: '#777' }}>Asientos Disponibles: {viajeSeleccionado.asientosDisponibles}</p>
            <p style={{ marginBottom: '5px', color: '#777' }}>Lugar de Recogida: {viajeSeleccionado.lugarRecogida}</p>
            <p style={{ marginBottom: '5px', color: '#777' }}>Hora de Salida: {viajeSeleccionado.horaSalida}</p>
            <p style={{ marginBottom: '20px', color: '#777' }}>Lugar de Destino: {viajeSeleccionado.lugarDestino}</p>

            <h3 style={{ marginBottom: '10px', color: '#555' }}>Reservar</h3>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="cantidadAsientos" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Cantidad de Asientos:</label>
              <input
                type="number"
                id="cantidadAsientos"
                min="1"
                max={viajeSeleccionado.asientosDisponibles}
                value={cantidadAsientos}
                onChange={(e) => setCantidadAsientos(parseInt(e.target.value, 10))}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  borderRadius: '5px', 
                  border: '1px solid #ccc',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button 
              onClick={handleReserva} 
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: 'none', 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }} 
              onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} 
              onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              Reservar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reserva;