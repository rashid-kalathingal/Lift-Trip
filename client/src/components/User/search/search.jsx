import React, { useState } from 'react';
import Select from 'react-dropdown-select';

const Search = () => {
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
  
    return (
        <div className="w-full bg-blue-100 h-40 justify-center flex items-center">
        <div className="flex items-start pr-4">
          <div className="text-left ">
            Ready To Go Somewhere?
          </div>
        </div>
        <div className="flex space-x-7">
          <div className="relative inline-flex items-center">
            {/* First Dropdown */}
            <Select
              options={pickUpOptions}
              values={selectedPickUpOption}
              onChange={(values) => setSelectedPickUpOption(values)}
              placeholder="Enter Pick-Up Location"
              dropdownHandle={false}
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
            />
          </div>
      
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Enter
          </button>
        </div>
      </div>
      
    );
  };
  
  export default Search;
  