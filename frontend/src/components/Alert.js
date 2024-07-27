// src/components/Alert.js
import React from 'react';
import { Transition } from '@headlessui/react';

const Alert = ({ message, type }) => {
  if (!message) return null;

  let alertStyle = "text-white px-4 py-2 rounded shadow-md mb-4 ";

  switch (type) {
    case 'success':
      alertStyle += "bg-gray-500";
      break;
    case 'error':
      alertStyle += "bg-red-500";
      break;
    default:
      alertStyle += "bg-gray-500";
      break;
  }

  return (
    <Transition
      show={!!message}
      enter="transition transform duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition transform duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="fixed top-0 right-0 m-4"
    >
      <div className={alertStyle}>
        {message}
      </div>
    </Transition>
  );
};

export default Alert;
