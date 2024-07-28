import React from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CustomButton = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full mb-4"
      style={{ borderRadius: '50px' }}
    >
      {children}
    </Button>
  );
};

const BackButton = ({ toUrl }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(toUrl);
  };

  return (
    <button onClick={handleBackClick} className="absolute top-4 left-4 text-black">
      <FontAwesomeIcon icon={faArrowLeft} size="1.5x" />
    </button>
  );
};

export default CustomButton
export { BackButton };
