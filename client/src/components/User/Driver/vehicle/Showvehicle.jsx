import React, { useState, useEffect } from 'react';
import image from '../../../../assets/vehicle.webp';
import Modal from 'react-modal';
import VehicleData from './Vehicle';
import Allvehicles from './Allvehicles';
import { useSelector } from 'react-redux';
import { request } from '../../../../utils/fetchApi';
import './style.css';

Modal.setAppElement('#root'); // Set the root element as the app element

const Showvehicle = ({ onVehicleSelect }) => {
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [availableSpace, setAvailableSpace] = useState('');
  const [vehicleImage, setVehicleImage] = useState(null);
  const [vehicleRC, setVehicleRC] = useState(null);
  const [vehicleInsurance, setVehicleInsurance] = useState(null);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showMyVehiclesModal, setShowMyVehiclesModal] = useState(false);

  // const [vehicle, setVehicle] = useState([]);
  const { user, token } = useSelector((state) => state.auth);
  const [selectedVehicle, setSelectedVehicle] = useState(null); // State to hold the selected vehicle

  // Callback function to create the vehicleData object and pass it to the parent component
  // const handleVehicleSelect = (vehicleData) => {
  //   setSelectedVehicle(vehicleData);

  //   // Create the vehicleData object
  //   const vehicleDataObject = {
  //     VehicleModel: vehicleData.VehicleModel,
  //     VehicleNumber: vehicleData.VehicleNumber,
  //     AvailableSpace: vehicleData.AvailableSpace,
  //     NumberOfSeats: vehicleData.NumberOfSeats,
  //     VehicleImage: vehicleData.VehicleImage,
  //     VehicleRC: vehicleData.VehicleRC,
  //     VehicleInsurance: vehicleData.VehicleInsurance,
  //   };

  //   // Call the parent component's callback function and pass the object
  //   onVehicleSelect(vehicleDataObject);
  // };

  // const id = user._id;

  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     try {
  //       const options = { Authorization: `Bearer ${token}` };
  //       const data = await request(`/auth/getVehicles/${id}`, 'GET', options);
  //       setVehicle(data);
  //       console.log(vehicle,"????????????");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchVehicles();
  // }, []);

  const openAddVehicleModal = () => {
    setShowAddVehicleModal(true);
  };

  const closeAddVehicleModal = () => {
    setShowAddVehicleModal(false);
  };

  const openMyVehiclesModal = () => {
    setShowMyVehiclesModal(true);
  };

  const closeMyVehiclesModal = () => {
    setShowMyVehiclesModal(false);
  };
  // Callback function to update the selected vehicle in the parent component
  const handleVehicleSelect = (vehicleData) => {
    setSelectedVehicle(vehicleData);
    setAvailableSpace(vehicleData.AvailableSpace);
    setVehicleModel(vehicleData.VehicleModel);
    setNumberOfSeats(vehicleData.NumberOfSeats);
    setVehicleNumber(vehicleData.VehicleNumber);
    setVehicleImage(vehicleData.VehicleImage);
    setVehicleRC(vehicleData.VehicleRC);
    setVehicleInsurance(vehicleData.VehicleInsurance);
    const vehicleDataObject = {
      VehicleModel: vehicleData.VehicleModel,
      VehicleNumber: vehicleData.VehicleNumber,
      AvailableSpace: vehicleData.AvailableSpace,
      NumberOfSeats: vehicleData.NumberOfSeats,
      VehicleImage: vehicleData.VehicleImage,
      VehicleRC: vehicleData.VehicleRC,
      VehicleInsurance: vehicleData.VehicleInsurance,
    };

    // Call the parent component's callback function and pass the object
    onVehicleSelect(vehicleDataObject);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {/* Right Side: Image */}
        <div className="md:w-1/2 ">
          <img
            src={image}
            alt="Image"
            className="w-full aspect-vedio mt-2 rounded-lg"
          />
        </div>
        {/* Left Side: Form and Images */}
        <div className=" p-6">
          <h1 className="text-2xl font-semibold mb-4">Vehicle Information</h1>
          <button
            type="button"
            onClick={openAddVehicleModal}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Add Vehicle
          </button>
          <button
            type="button"
            onClick={openMyVehiclesModal}
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            My Vehicles
          </button>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="mb-4">
              <label
                htmlFor="vehicleModel"
                className="block text-sm font-medium text-gray-700">
                Vehicle Model
              </label>
              <input
                type="text"
                id="vehicleModel"
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                value={vehicleModel}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="vehicleNumber"
                className="block text-sm font-medium text-gray-700">
                Vehicle Number
              </label>
              <input
                type="text"
                id="vehicleNumber"
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                value={vehicleNumber}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="numberOfSeats"
                className="block text-sm font-medium text-gray-700">
                Number of Seats
              </label>
              <input
                type="text"
                id="numberOfSeats"
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                value={numberOfSeats}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="availableSpace"
                className="block text-sm font-medium text-gray-700">
                Available Space
              </label>
              <input
                type="text"
                id="availableSpace"
                className="w-full bg-gray-100 border border-gray-300 text-gray-700 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                value={availableSpace}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="vehicleImage"
                className="block text-sm font-medium text-gray-700">
                Vehicle Image
              </label>
              <img
                src={vehicleImage}
                alt="Vehicle Image"
                className="w-52  h-28 mt-2 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="vehicleRC"
                className="block text-sm font-medium text-gray-700">
                Vehicle RC
              </label>
              <img
                src={vehicleRC}
                alt="Vehicle RC"
                className="w-52  h-28 mt-2 rounded-lg"
              />
            </div>

            <div>
              <label
                htmlFor="vehicleInsurance"
                className="block text-sm font-medium text-gray-700">
                Vehicle Insurance
              </label>
              <img
                src={vehicleInsurance}
                alt="Vehicle Insurance"
                className="w-52  h-28 mt-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <Modal
        isOpen={showAddVehicleModal}
        onRequestClose={closeAddVehicleModal}
        className="Modal"
        overlayClassName="Overlay">
        <button
          type="button"
          onClick={closeAddVehicleModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none">
          &#x2715;
        </button>
        <div className="p-6">
          {/* Add Vehicle Modal content (VehicleData component) */}
          <VehicleData onClose={closeAddVehicleModal} />
        </div>
      </Modal>

      {/* My Vehicles Modal */}
      <Modal
        isOpen={showMyVehiclesModal}
        onRequestClose={closeMyVehiclesModal}
        className="Modal"
        overlayClassName="Overlay">
        <button
          type="button"
          onClick={closeMyVehiclesModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none">
          &#x2715;
        </button>
        <div className="p-6">
          {/* My Vehicles Modal content (Allvehicles component) */}
          <Allvehicles
            userId={user._id}
            onVehicleSelect={handleVehicleSelect}
            onClose={closeMyVehiclesModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Showvehicle;
