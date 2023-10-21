import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../../utils/fetchApi';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/authSlice';
import LoginImage from '../../../assets/log.jpg';
import icon from '../../../assets/liftTrip.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isValidMobile(mobile)) {
      setError('Please enter a valid mobile number.');
      return;
    }

    try {
      const options = {
        'Content-Type': 'application/json',
      };

      // If email is not registered, proceed with registration
      const registrationData = await request(
        '/auth/register',
        'POST',
        options,
        { username, email, mobile, password }
      );
      console.log(registrationData, '////////////..............////////');
      if (registrationData.error) {
        setError(registrationData.error); // Set the error message from the response
      } else {
        dispatch(register(registrationData));
        navigate('/');
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 500)
      ) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred during registration.');
      }
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    // Basic mobile number validation for a 10-digit Indian number
    const mobileRegex = /^[6789]\d{9}$/;
    return mobileRegex.test(mobile);
  };
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen">
      {/* Left half: Image */}
      <div
        className="w-1/2 bg-cover bg-blend-darken"
        style={{ backgroundImage: `url(${LoginImage})` }}></div>

      {/* Right half: Register Form */}
      <div className="w-1/2 bg-blue-950 flex justify-center items-center">
        <div className="w-3/4">
          <div className="text-center mb-4">
            <img src={icon} alt="Icon" className="w-1/3 mx-auto" />
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-3xl text-center text-indigo-900 mb-8">
              Register
            </h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username..."
                className="border-b border-gray-400 px-2 py-1 outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email..."
                className="border-b border-gray-400 px-2 py-1 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="Number"
                placeholder="Phone Number..."
                className="border-b border-gray-400 px-2 py-1 outline-none"
                onChange={(e) => setMobile(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password..."
                className="border-b border-gray-400 px-2 py-1 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md text-center hover:bg-blue-600 transition-colors duration-300">
                Register
              </button>
              <p className="text-red-500 text-center">{error}</p>
              <p className="text-gray-600 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
