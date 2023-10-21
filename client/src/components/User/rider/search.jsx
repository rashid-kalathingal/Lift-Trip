import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import Swal from 'sweetalert2';

const search = () => {
  const [selectedPickUpOption, setSelectedPickUpOption] = useState([]);
  const [selectedDropOffOption, setSelectedDropOffOption] = useState([]);
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

  console.log('====================================');
  console.log(selectedPickUpOption, selectedDropOffOption);
  console.log('====================================');
  return (
    <div className="w-full bg-blue-100 h-40 grid grid-cols-4 gap-4 place-items-center">
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
    </div>
  );
};

export default search;
