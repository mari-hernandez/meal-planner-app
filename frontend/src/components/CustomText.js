import React from 'react';

const CustomHeading = ({ children }) => {
  return (
    <h1 className="text-3xl font-bold mt-8 mb-6 text-black">
      {children}
    </h1>
  );
};

const CustomParagraph = ({ children }) => {
  return (
    <p className="text-xs text-gray-400 mt-4 text-center px-4">
      {children}
    </p>
  );
};

export default CustomHeading;
export { CustomParagraph };
