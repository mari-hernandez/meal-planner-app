// src/pages/login/Register.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../../components/Alert';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post( `${backendUrl}/register`, {
        email,
        username,
        password
      });
      if (response.status === 201) {
        setAlertMessage('Usuario Creado Exitosamente!');
        setAlertType('success');
        setTimeout(() => {
          setAlertMessage('');
          navigate('/signin');
        }, 3000); // Espera 3 segundos antes de redirigir
      }
    } catch (error) {
      console.error('Error creando el usuario:', error);
      setAlertMessage('Error creando el usuario');
      setAlertType('error');
      setTimeout(() => setAlertMessage(''), 3000); // Espera 3 segundos antes de ocultar el mensaje
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <Alert message={alertMessage} type={alertType} />
      <button onClick={handleBackClick} className="absolute top-4 left-4 text-black">
        <FontAwesomeIcon icon={faArrowLeft} size="1.5x" />
      </button>
      <div className="w-full px-6 mt-12"> {/* Ajuste del margen superior */}
        <h1 className="text-3xl font-bold mb-8 text-black">Regístrate en Meal Planner</h1>
        <form onSubmit={handleRegister} className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo
            </label>
            <input
              id="email"
              type="email"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
