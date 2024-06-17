// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './AuthContext';

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpiar el mensaje de error

    try {
      const userCredential = await signInWithEmailAndPassword(auth, correoElectronico, contrasena);
      login(userCredential.user);
      console.log('Inicio de sesión exitoso:', userCredential.user);
      navigate('/home');
    } catch (error) {
      setError('Las Credenciales de inicio de sesión son incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(135deg, #71b7e6, #9b59b6)' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', width: '300px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '20px', fontWeight: 'bold' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="correoElectronico"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="contrasena" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Contraseña:</label>
            <input
              type="password"
              id="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'} onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}>
            Iniciar Sesión
          </button>
        </form>
        <button onClick={handleRegisterRedirect} style={{ marginTop: '20px', width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f39c12', color: 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#e67e22'} onMouseOut={(e) => e.target.style.backgroundColor = '#f39c12'}>
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default Login;