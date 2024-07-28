import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CustomButton, { BackButton } from '../../components/CustomButton';
import CustomHeading from '../../components/CustomText';
import CustomPrincipalDiv from '../../components/CustomDiv';

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


  return (
    <CustomPrincipalDiv>
      <BackButton toUrl="/" /> 
      <div className="w-full px-6 mt-12"> {/* Ajuste del margen superior */}
      <CustomHeading>Regístrate en Meal Planner </CustomHeading>
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
          <div className="flex flex-col items-center justify-between w-full">
            <CustomButton type="submit" color="primary">
              Regístrate
            </CustomButton>
            {alertMessage && (
              <Alert severity={alertType} className="w-full">
                {alertMessage}
              </Alert>
            )}
          </div>
        </form>
      </div>
    </CustomPrincipalDiv>
  );
};

export default Register;
