import React from 'react';

const CustomPrincipalDiv = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-full px-6">
        {children}
        </div>
    </div>
    

  );
};

export default CustomPrincipalDiv;

