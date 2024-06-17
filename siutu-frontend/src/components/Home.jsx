// components/Home.js
import React from 'react';
import { useAuth } from './AuthContext';
import buscarImage from '../img/SearchRide.jpg';
import ofrecerImage from '../img/OffertRide.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleOpcionChange = (opcion) => {
    if (!user) {
      navigate('/');
    } else {
      if (opcion === 'buscar') {
        navigate('/reserva');
      } else if (opcion === 'ofrecer') {
        navigate('/viaje');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px' }}>
        <h1>SIUTU</h1>
        {user && <p>Bienvenido, {user ? user.name : 'Invitado'}</p>} {/* Muestra el nombre del usuario si está autenticado */}
      </header>
      <main style={{ padding: '20px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <button 
              onClick={() => handleOpcionChange('buscar')}
              style={{ 
                background: `url(${buscarImage}) no-repeat center center`, 
                backgroundSize: 'cover', 
                width: '100%', 
                height: '100%', 
                border: 'none', 
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                color: 'white',
                fontSize: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px'
              }}>Buscar Transporte</span>
            </button>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <button 
              onClick={() => handleOpcionChange('ofrecer')}
              style={{ 
                background: `url(${ofrecerImage}) no-repeat center center`, 
                backgroundSize: 'cover', 
                width: '100%', 
                height: '100%', 
                border: 'none', 
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{
                color: 'white',
                fontSize: '20px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px'
              }}>Ofrecer Transporte</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;