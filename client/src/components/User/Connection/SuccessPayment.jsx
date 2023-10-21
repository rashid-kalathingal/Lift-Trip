import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPayment = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="text-5xl text-green-500">
        <FaCheckCircle />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 mt-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Thank you for your payment. Your ride is confirmed.
      </p>
      {/* <button className="bg-blue-500 text-white mt-8 px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
        Back to Dashboard
      </button> */}
    </div>
  );
};

export default SuccessPayment;
