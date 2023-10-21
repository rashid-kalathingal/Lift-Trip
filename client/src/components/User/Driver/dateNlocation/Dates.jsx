import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import Swal from 'sweetalert2';
const Dates = ({ onDateSelection }) => {
  const [selectedPickUpOption, setSelectedPickUpOption] = useState([]);
  const [selectedDropOffOption, setSelectedDropOffOption] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  // Calculate the minimum date (today)
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const today = `${year}-${month}-${day}`;
  console.log(today, 'ttoo');
  console.log(selectedDate, '///');

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

  const pickUpOptions = [
    { label: 'Thiruvananthapuram', value: 'thiruvananthapuram' },
    { label: 'Kochi', value: 'kochi' },
    { label: 'Kozhikode', value: 'kozhikode' },
    { label: 'Kollam', value: 'kollam' },
    { label: 'Thrissur', value: 'thrissur' },
    { label: 'Alappuzha', value: 'alappuzha' },
    { label: 'Palakkad', value: 'palakkad' },
    { label: 'Kannur', value: 'kannur' },
    { label: 'Kottayam', value: 'kottayam' },
    { label: 'Pathanamthitta', value: 'pathanamthitta' },
    { label: 'Idukki', value: 'idukki' },
    { label: 'Malappuram', value: 'malappuram' },
    { label: 'Wayanad', value: 'wayanad' },
    { label: 'Ernakulam', value: 'ernakulam' },
    { label: 'Kasaragod', value: 'kasaragod' },
  ];

  const dropOffOptions = [
    { label: 'Thiruvananthapuram', value: 'thiruvananthapuram' },
    { label: 'Kochi', value: 'kochi' },
    { label: 'Kozhikode', value: 'kozhikode' },
    { label: 'Kollam', value: 'kollam' },
    { label: 'Thrissur', value: 'thrissur' },
    { label: 'Alappuzha', value: 'alappuzha' },
    { label: 'Palakkad', value: 'palakkad' },
    { label: 'Kannur', value: 'kannur' },
    { label: 'Kottayam', value: 'kottayam' },
    { label: 'Pathanamthitta', value: 'pathanamthitta' },
    { label: 'Idukki', value: 'idukki' },
    { label: 'Malappuram', value: 'malappuram' },
    { label: 'Wayanad', value: 'wayanad' },
    { label: 'Ernakulam', value: 'ernakulam' },
    { label: 'Kasaragod', value: 'kasaragod' },
  ];
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
          options={pickUpOptions}
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
          options={dropOffOptions}
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
