import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/CustomButton';
import CustomHeading, { CustomParagraph } from '../../components/CustomText';
import CustomPrincipalDiv from '../../components/CustomDiv';

function Landing() {
  return (
    <CustomPrincipalDiv>
      <FontAwesomeIcon icon={faUtensils} size="4x" className="mb-6 text-gray-500" />
        <CustomHeading>Te damos la bienvenida a Meal Planner</CustomHeading>
        <Link to="/register" className="mb-2 block">
          <CustomButton color="primary">Regístrate</CustomButton>
        </Link>
        <Link to="/signin" className="block">
          <CustomButton color="secondary">Iniciar sesión</CustomButton>
        </Link>
      <CustomParagraph>
        Si continúas, aceptas los Términos del servicio de Meal Planner y confirmas que has leído nuestra Política de privacidad.
      </CustomParagraph>
    </CustomPrincipalDiv>
  );
}

export default Landing;
