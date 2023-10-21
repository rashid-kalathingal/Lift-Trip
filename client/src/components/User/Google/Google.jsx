import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { userInstance } from '../../../utils/axiosApi';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/authSlice';

const Google = () => {
  // const { addToast } = useToasts()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      var decodedToken = jwt_decode(credentialResponse.credential);
      console.log(decodedToken, '❤❤❤');

      const registrationData = await userInstance.post(
        '/googleAuth',
        decodedToken
      );
      console.log('====================================');
      console.log(registrationData, 'kklkl');
      console.log('====================================');
      if (registrationData.error) {
        //setError(registrationData.error); // Set the error message from the response
        console.log(registrationData.error);
      } else {
        dispatch(register(registrationData.data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failed', error);
    // addToast("Google login failed", { appearance: 'error', autoDismiss: true });
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginFailure}
      />
    </div>
  );
};

export default Google;
