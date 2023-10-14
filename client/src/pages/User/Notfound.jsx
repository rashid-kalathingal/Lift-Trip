import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold text-gray-800">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for doesn't exist.
      </p>
    
    </div>
  );
};

export default NotFound;
