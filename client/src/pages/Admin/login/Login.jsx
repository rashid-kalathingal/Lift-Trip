import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../../../utils/fetchApi';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/adminAuthSlice';
import icon from '../../../assets/liftTrip.png';
import image from '../../../assets/gettyimages-4.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') return;

    try {
      const options = {
        'Content-Type': 'application/json',
      };

      const data = await request('/adminAuth/login', 'POST', options, {
        email,
        password,
      });
      console.log(data);

      dispatch(login(data));
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div
        className=" bg-cover"
        style={{ backgroundImage: `url(${image})` }}>
        {/* Background Image */}
      </div>
      <div className=" flex justify-center items-center bg-amber-950">
        <div className="w-full max-w-xs">
          <div className="text-center mb-4">
            <img src={icon} alt="Icon" className="w-1/3 mx-auto" />
          </div>
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Email..."
                className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password..."
                className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
