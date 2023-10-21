import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiUser, FiUsers, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { logout } from '../../../redux/authSlice';
import logo from '../../../assets/liftTrip.png'; // Update with your logo's path
import logoo from '../../../assets/ss.jpg';
import { userInstance } from '../../../utils/axiosApi';
import NotificationDropdown from './NotificationDropdown';
import { FaWallet } from 'react-icons/fa';
import io from 'socket.io-client';

const ENDPOINT = 'http://localhost:5000';
const socket = io(ENDPOINT);

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  const [display, setDisplay] = useState('');
  const [verconnection, setVerconnection] = useState('');
  const profile = useRef(null);
  const profileBtn = useRef(null);
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const handleNotificationClick = async () => {
    console.log('why yaar');
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const connection = await userInstance.get(
        `/getconnections/${user._id}`,
        options
      );
      console.log(connection.data, '??>>>');

      setVerconnection(connection.data);
    } catch (error) {
      console.error(error);
    }
  };
  // useEffect(() => {
  //   if (user && user._id) {
  //     fetchData();
  //   }
  // }, [user, token]);

  useEffect(() => {
    const handleDocumentClick = ({ target }) => {
      if (
        !profile.current.contains(target) &&
        !profileBtn.current.contains(target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    if (user?.displayPic) {
      setDisplay(user?.displayPic[0]);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-12 mr-3" alt="Logo" />
          </a>
          <div className="hidden md:flex space-x-4 items-center">
            <a href="#" className="text-blue-700 hover:text-blue-900">
              <Link to="/">Home</Link>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700">
              About
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700">
              <Link to="/rider">Rider</Link>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700">
              <Link to="/driver">Driver</Link>
            </a>
          </div>

          <div className="flex items-center justify-between gap-9">
            <NotificationDropdown
              data={verconnection}
              onClick={handleNotificationClick}
            />
            <Link to="/wallet">
              <FaWallet style={{ color: 'white' }} />
            </Link>
          </div>

          {!user ? (
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-blue-700">
                <FiLogIn className="mr-2" />
                <Link to="/login">LogIn</Link>
              </button>
              <button className="flex items-center text-blue-700">
                <FiUserPlus className="mr-2" />
                <Link to="/register">Register</Link>
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="flex relative mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={showDropdown}
                onClick={() => setShowDropdown(!showDropdown)}
                ref={profileBtn}>
                <span className="sr-only">Open user menu</span>
                {/* Replace with the user's profile image */}
                {display ? (
                  <img
                    className="w-10 h-10 rounded"
                    src={
                      display.startsWith('http')
                        ? display
                        : `http://localhost:5000/images/${display}`
                    }
                    alt="user"
                  />
                ) : (
                  <img className="w-10 h-10 rounded" src={logoo} alt="user" />
                )}
                <span className="-top-2 -right-2 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </button>
              {showDropdown && (
                <div
                  className="absolute z-50 right-11 mt-7 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                  ref={profile}>
                  <ul className="pt-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FiUser className="inline-block w-5 h-5 mr-2" />
                        <Link to="/profile">My Profile</Link>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        <FiUsers className="inline-block w-5 h-5 mr-2" />
                        <Link to="/connections">My Connections</Link>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={handleLogout}>
                        <FiLogOut className="inline-block w-5 h-5 mr-2" /> Sign
                        out
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
