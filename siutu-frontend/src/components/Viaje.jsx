import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Viaje() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [conductorId ] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('carro');
  const [asientosDisponibles, setAsientosDisponibles] = useState(4);
  const [lugarRecogida, setLugarRecogida] = useState('');
  const [horaSalida, setHoraSalida] = useState('');
  const [lugarDestino, setLugarDestino] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar errores previos

    try {
      const response = await axios.post('http://localhost:8080/api/viajes', {
        conductorEmail: user.correoElectronico,
        tipoVehiculo,
        asientosDisponibles,
        lugarRecogida,
        horaSalida,
        lugarDestino,
      });

      console.log('Viaje creado:', response.data);

      // Limpiar formulario y redirigir al home
      setTipoVehiculo('carro');
      setAsientosDisponibles(4);
      setLugarRecogida('');
      setHoraSalida('');
      setLugarDestino('');
      navigate('/'); 
    } catch (error) {
      console.error('Error al crear el viaje:', error);
      setError('Hubo un error al crear el viaje. Por favor, inténtalo de nuevo.');
    }
  };

  const handleTipoVehiculoChange = (event) => {
    const nuevoTipo = event.target.value;
    setTipoVehiculo(nuevoTipo);

    if (nuevoTipo === 'moto') {
      setAsientosDisponibles(1);
    } else {
      setAsientosDisponibles(4);
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
        <h2 style={{ marginBottom: '20px' }}>Crear Viaje</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="conductorId" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>ID del Conductor:</label>
            <input
              type="text"
              id="conductorId"
              value={conductorId}
              readOnly
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                backgroundColor: '#f0f0f0'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="tipoVehiculo" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Tipo de Vehículo:</label>
            <select
              id="tipoVehiculo"
              value={tipoVehiculo}
              onChange={handleTipoVehiculoChange}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            >
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="asientosDisponibles" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Asientos Disponibles:</label>
            <input
              type="number"
              id="asientosDisponibles"
              value={asientosDisponibles}
              onChange={(e) => setAsientosDisponibles(e.target.value)}
              disabled={tipoVehiculo === 'moto'}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lugarRecogida" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Lugar de Recogida:</label>
            <input
              type="text"
              id="lugarRecogida"
              value={lugarRecogida}
              onChange={(e) => setLugarRecogida(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="horaSalida" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Hora de Salida:</label>
            <input
              type="time"
              id="horaSalida"
              value={horaSalida}
              onChange={(e) => setHoraSalida(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="lugarDestino" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Lugar de Destino:</label>
            <input
              type="text"
              id="lugarDestino"
              value={lugarDestino}
              onChange={(e) => setLugarDestino(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '10px', 
                borderRadius: '5px', 
                border: '1px solid #ccc',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button type="submit" style={{ 
            width: '100%', 
            padding: '10px', 
            borderRadius: '5px', 
            border: 'none', 
            backgroundColor: '#007BFF', 
            color: 'white', 
            fontSize: '16px' 
          }}>
            Crear Viaje
          </button>
        </form>
      </div>
    </div>
  );
}

export default Viaje;