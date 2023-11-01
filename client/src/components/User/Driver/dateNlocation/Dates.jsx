import React, { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import Swal from 'sweetalert2';
import { userInstance, setAccessToken } from '../../../../utils/axiosApi';
import { useSelector } from 'react-redux';
const Dates = ({ onDateSelection }) => {
  const [selectedPickUpOption, setSelectedPickUpOption] = useState([]);
  const [selectedDropOffOption, setSelectedDropOffOption] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const { user, token } = useSelector((state) => state.auth);

  // Calculate the minimum date (today)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setAccessToken(token);
        const responses = await userInstance.get('/getplaces');
        setPlaces(responses.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchRides();
  }, [token, user._id]); // Add token as a dependency to re-fetch when it changes
  
  const placeOptions = places.map(place => ({
    value: place,
    label: place
  }));


  const handleDateChange = (e) => {
    const myDate = e.target.value;
    if (myDate < today) {
      Swal.fire({
        icon: 'error',
        title: 'Change your Date!!!!',
        text: 'selected past dates!!',
      });
    } else {
      setSelectedDate(e.target.value);
    }
  };
  const handleSelection = () => {
    const selectedData = {
      pickUpOption: selectedPickUpOption,
      dropOffOption: selectedDropOffOption,
      date: selectedDate,
    };

    onDateSelection(selectedData);
  };

  return (
    <div className="w-full bg-blue-100 py-6 grid md:grid-cols-4 gap-4 place-items-center">
      <div>
        <input
          type="date"
          id="expires"
          name="expires"
          value={selectedDate}
          onChange={handleDateChange}
          // min={minDate}
          className="w-full bg-transparent border border-gray-300 rounded-md py-2 px-3 text-gray-700 dark:bg-gray-200 dark:border-gray-600 dark:text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 hover:border-gray-400"
          style={{ width: '200px' }}
          required
        />
      </div>

      <div className="relative inline-flex items-center">
        {/* First Dropdown */}
        <Select
          options={placeOptions}
          values={selectedPickUpOption}
          onChange={(values) => setSelectedPickUpOption(values)}
          placeholder="Enter Pick-Up Location"
          dropdownHandle={false}
          style={{ width: '200px' }}
        />
      </div>

      <div className="relative inline-flex items-center">
        {/* Second Dropdown */}
        <Select
          options={placeOptions}
          values={selectedDropOffOption}
          onChange={(values) => setSelectedDropOffOption(values)}
          placeholder="Enter Drop-Off Location"
          dropdownHandle={false}
          style={{ width: '200px' }}
        />
      </div>

      <button
        onClick={handleSelection}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Enter
      </button>
    </div>
  );
};

export default Dates;
