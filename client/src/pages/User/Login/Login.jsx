import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { request } from '../../../utils/fetchApi';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice';
import LoginImage from '../../../assets/log.jpg';
import icon from '../../../assets/liftTrip.png';
import Google from '../../../components/User/Google/Google';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Please enter both email and password.');
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

    try {
      const options = {
        'Content-Type': 'application/json',
      };

      const data = await request('/auth/login', 'POST', options, {
        email,
        password,
      });
      console.log(data, '////////////');
      console.log(data.message, '/');
      if (data.message) {
        setError(data.message);
        return;
      }

      if (!data.token) {
        setError(data.error);
      } else {
        dispatch(login(data));
        navigate('/');
      }
    } catch (error) {
      setError('An error occurred while logging in.');
      console.error(error);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

      {/* Right half: Login Form */}
      <div className="w-1/2 bg-blue-950 flex justify-center items-center">
        <div className="w-3/4">
          <div className="text-center mb-4">
            <img src={icon} alt="Icon" className="w-1/3 mx-auto" />
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-3xl text-center text-indigo-900 mb-8">Login</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email..."
                className="border-b border-gray-400 px-2 py-1 outline-none"
                onChange={(e) => setEmail(e.target.value)}
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
                Login
              </button>
              <p className="text-red-500 text-center">{error}</p>
              <p className="text-gray-600 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
              <Google />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
