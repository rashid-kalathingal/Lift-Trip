import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../../../utils/fetchApi';
//import { useSelector } from 'react-redux';

const Allvehicles = ({ userId, onVehicleSelect }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicle, setVehicle] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(
          `/auth/getVehicles/${userId}`,
          'GET',
          options
        );
        setVehicle(data);
        console.log(vehicle, '????????????');
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, []);

  console.log(vehicle, '?/////////');
  const handleCardClick = (vehicleData) => {
    setSelectedVehicle(vehicleData);
    // Call the callback function to notify the parent component of the selected vehicle
    onVehicleSelect(vehicleData);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {vehicle.map((vehicleData, index) => (
        <label
          key={index}
          className={`flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
            selectedVehicle === vehicleData ? 'border-blue-500' : ''
          }`}>
          <input
            type="radio"
            name="selectedVehicle"
            value={vehicleData._id} // Assuming _id is a unique identifier for each vehicle
            checked={selectedVehicle === vehicleData}
            onChange={() => handleCardClick(vehicleData)}
          />
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={vehicleData.VehicleImage[0]}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {vehicleData.VehicleModel}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Vehicle Number: {vehicleData.VehicleNumber}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Number of Seats: {vehicleData.NumberOfSeats}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Available Space: {vehicleData.AvailableSpace}
            </p>
          </div>
        </label>
      ))}
    </div>
  );
};

export default Allvehicles;
