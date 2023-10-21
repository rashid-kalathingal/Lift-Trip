import React, { useState } from 'react';
import {
  FiBarChart2,
  FiUsers,
  FiCheckSquare,
  FiAlertCircle,
  FiArrowLeft,
} from 'react-icons/fi';
import logo from '../../../assets/liftTrip.png';
import { Link } from 'react-router-dom';

const Vnavbar = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('Dashboard'); // Default selected menu

  const handleMenuClick = (menuItem) => {
    setSelectedMenu(menuItem);
    // onMenuItemClick(menuItem);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}>
        <span
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}>
          <FiArrowLeft />
        </span>
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            alt="?"
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]'
            }`}
          />
        </div>
        <ul className="pt-6">
          <li
            className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9 ${
              selectedMenu === 'Dashboard' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleMenuClick('Dashboard')}>
            <span className="mr-2 ">
              <FiBarChart2 />
            </span>

            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              <Link to="/admin">Dashboard</Link>
            </span>
          </li>

          <li
            className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9 ${
              selectedMenu === 'Users' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleMenuClick('Users')}>
            <span className="mr-2">
              <FiUsers />
            </span>

            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              <Link to="/admin/users">Users</Link>
            </span>
          </li>

          <li
            className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9 ${
              selectedMenu === 'Verifications' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleMenuClick('Verifications')}>
            <span className="mr-2">
              <FiCheckSquare />
            </span>
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              <Link to="/admin/verification">Verifications</Link>
            </span>
          </li>

          {/* <li
            className={`text-gray-300  text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-9 ${
              selectedMenu === 'Abuse Handling' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleMenuClick('Abuse Handling')}
          >
            <span className='mr-2'>
              <FiAlertCircle />
            </span>
            <span className={`${!open && 'hidden'} origin-left duration-200`}><Link to="/admin/abuseHandling">Abuse Handling</Link></span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Vnavbar;
