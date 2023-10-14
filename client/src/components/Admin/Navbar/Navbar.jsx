import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import image from '../../../assets/log.jpg'
import { logout } from '../../../redux/adminAuthSlice';
const Navbar = () => {
    
    const [showLogoutDropdown, setShowLogoutDropdown] = useState(false); 
    const handleProfileImageClick = () => {
        setShowLogoutDropdown(!showLogoutDropdown);
      };
      const dispatch = useDispatch();
      const handleLogout = () => {
        dispatch(logout());
      };
  return (
    <nav className=" bg-dark-purple p-4 flex justify-between items-center">
      {/* Logo */}
      <a href="#" className="text-white font-semibold text-lg">
        Admin Panel
      </a>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="py-1 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
        />
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </button>
      </div>

      {/* User View */}
      <div className='flex items-center'>
          <div className='w-10 h-10 bg-gray-300 rounded-full overflow-hidden' onClick={handleProfileImageClick}>
            <img src={image} alt='User' className='w-full h-full object-cover cursor-pointer' />
          </div>
          {showLogoutDropdown && (
            <div className='ml-2'>
              {/* Dropdown content */}
              <button
                className='text-gray-300 text-sm hover:text-white focus:outline-none'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
    </nav>
  );
};

export default Navbar;
