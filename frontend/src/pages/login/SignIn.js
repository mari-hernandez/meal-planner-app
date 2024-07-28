import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Alert from '@mui/material/Alert';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL
      const response = await axios.post( `${backendUrl}/login`, {
        email,
        password
      });
      if (response.status === 200) {
        login({ token: response.data.token });
        navigate('/home');
      }
    } catch (error) {
      console.error('Error correo o contraeña incorrecta:', error);
      setAlertMessage('Error correo o contraeña incorrecta');
      setAlertType('error');
      setTimeout(() => setAlertMessage(''), 3000); // Espera 3 segundos antes de ocultar el mensaje
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <button onClick={handleBackClick} className="absolute top-4 left-4 text-black">
        <FontAwesomeIcon icon={faArrowLeft} size="1.5x" />
      </button>
      
      <div className="w-full px-6">
      <h1 className="text-3xl font-bold mb-8 text-black">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        
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
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-between w-full">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full mb-4"
          >
            Iniciar sesión
          </button>
          {alertMessage &&<Alert severity={alertType} className="w-full">
            {alertMessage}
          </Alert>}
        </div>
      </form>
      </div>
    </div>
  );
}

export default SignIn;
