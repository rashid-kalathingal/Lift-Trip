import React, { useEffect, useRef, useState } from 'react'
import picture from '../../../../assets/driverbg.webp'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { userInstance } from '../../../../utils/axiosApi';
import {changeuserDp} from '../../../../redux/authSlice'
//import logoo from '../../../../assets/ss.jpg'
const Driver = ({header}) => {
  const { user,token } = useSelector((state) => state.auth);
  const [id, setId] = useState(user._id);
  const [display, setDisplay]=useState(user?.displayPic?.[0])
  const dispatch =useDispatch()

  console.log('====================================');
  console.log(user);
  console.log('====================================');

  
 



    // Initialize inputValue state with the default value
    const [inputValue, setInputValue] = useState({
      user: user.username || '',
      number: user.mobile || '',
      mail: user.email || '',
    });
  
     // Function to handle changes to the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
 
   // Function to handle file selection
   const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Handle the selected file (e.g., upload it to the server)
      console.log('Selected file:', selectedFile);

      // Assuming you want to call changeDp when a file is selected
      changeDp(selectedFile);
    }
  };

  const changeDp = async (selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('displayPic', selectedFile);
  
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      };
  
      // Include the user ID in the URL
      const response = await userInstance.put(`/profile/${id}`, formData, options);
      console.log(response,"????");
      setDisplay(response.data.data)
      dispatch(changeuserDp(response.data.data))
      Swal.fire(
        'success',
        'Image Updated successfully!!',
        'success'
      )
      // window.location.reload();
      // Handle the response as needed
      console.log('Response from server:', response);
    } catch (error) {
      console.error(error);
    }
  };
  
  // const fileInputRef = useRef(null);
  // const openFileInput = () => {
  //   fileInputRef.current.click();
  // };
  console.log(user);
  console.log(display,"::::::::::::::::::::");
  return (
    <div className="bg-slate-100 flex">
  {/* Left Side: Form */}
  <div className="flex-1 p-6">
    <h1 className="text-blue-950 text-2xl mb-4">{header}</h1>
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="mb-4">
        <label htmlFor="user" className="block text-sm font-medium text-gray-800">
          User
        </label>
        <input
          type="text"
          id="user"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter User"
          value={inputValue.user}
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="number" className="block text-sm font-medium text-gray-800 ">
          Number
        </label>
        <input
          type="text"
          id="number"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Number"
          value={inputValue.number}
          required
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="mail" className="block text-sm font-medium text-gray-800 ">
          Mail
        </label>
        <input
          type="text"
          id="mail"
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Mail"
          value={inputValue.mail}
          required
          onChange={handleInputChange}
        />
      </div>
      {display ? (
  <img
    src={`http://localhost:5000/images/${display}`}
    alt="Profile"
    className="w-60 h-52"
  />
) : (
  <div className="w-80 h-9">
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG, or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileSelect} />
      </label>
    </div>
  </div>
)}
      {/* <div className="mb-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-800 ">
          Gender
        </label>
        <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={inputValue.gender === 'male'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="male" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Male
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={inputValue.gender === 'female'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="female" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  checked={inputValue.gender === 'other'}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="other" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Other
                </label>
              </div>
            </div>
      </div> */}
    </div>

 
  </div>

  {/* Right Side: Image */}
  <div className="flex-1">
    <img
      src={picture} // Replace with your image source
      alt="Image"
      className="w-full h-auto mt-2 rounded-lg"
    />
  </div>
</div>

  )
}

export default Driver
