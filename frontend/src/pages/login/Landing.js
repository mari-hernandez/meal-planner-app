import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <FontAwesomeIcon icon={faUtensils} size="4x" className="mb-6 text-gray-500" />
      
      <div className="w-full px-6">
      <h1 className="text-3xl font-bold mt-8 mb-6 text-black">Te damos la bienvenida a Meal Planner</h1>
        <Link to="/register" className="mb-2 block">
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 w-full rounded-full">Regístrate</button>
        </Link>
        <Link to="/signin" className="block">
          <button className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 w-full rounded-full">Iniciar sesión</button>
        </Link>
      </div>
      <p className="text-xs text-gray-400 mt-4 text-center px-4">
        Si continúas, aceptas los Términos del servicio de Meal Planner y confirmas que has leído nuestra Política de privacidad.
      </p>
    </div>
  );
}

export default Landing;
