import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { request } from '../../../utils/fetchApi';
import Navbar from '../navbar/Navbar';
//import { useSelector } from 'react-redux';

const Myvehicle = () => {
  const [selectedVehicle] = useState(null);
  const [vehicle, setVehicle] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const userId = user._id;
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

  //  // State to manage whether the modal is open or not
  //  const [isModalOpen, setIsModalOpen] = useState(false);

  //  // Function to open the modal
  //  const openModal = () => {
  //    setIsModalOpen(true);
  //  };

  //  // Function to close the modal
  //  const closeModal = () => {
  //    setIsModalOpen(false);
  //  };

  console.log(vehicle, '?/////////');
  //   const handleCardClick = (vehicleData) => {
  //     setSelectedVehicle(vehicleData);
  //       // Call the callback function to notify the parent component of the selected vehicle
  //       onVehicleSelect(vehicleData);
  //   };

  return (
    <>
      <section className="container mx-auto p-10 md:p-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-y-10 transform duration-500">
        {vehicle.map((vehicleData, index) => (
          <article
            key={index}
            className="shadow-md mx-auto max-w-sm transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
            <div className="max-h-140 overflow-hidden">
              <img
                className="w-full h-auto"
                src={`http://localhost:5000/images/${vehicleData.VehicleImage[0]}`}
                alt=""
              />
            </div>
            <div className="p-7 my-auto pb-12 ">
              <h1 className="text-2xl font-semibold text-gray-700">
                {vehicleData.VehicleModel}
              </h1>
              <p className="text-xl font-light leading-relaxed text-gray-400 mt-5">
                Vehicle Number: {vehicleData.VehicleNumber}
                <br />
                Number of Seats: {vehicleData.NumberOfSeats}
                <br />
                Available Space: {vehicleData.AvailableSpace}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Myvehicle;
