import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../../components/User/navbar/Navbar';
import Footer from '../../../components/User/footer/footer';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2'
import { userInstance } from '../../../utils/axiosApi';
import { Link } from 'react-router-dom';
import logoo from '../../../assets/ss.jpg'
import { changeuserName , changeuserEmail,changeuserDp,changeuserNumber } from '../../../redux/authSlice';
import Myvehicle from '../../../components/User/profile/Myvehicle';
import MyConnection from '../../../components/User/profile/MyConnection';
import RideHistory from '../../../components/User/profile/RideHistory';
import UpComingRide from '../../../components/User/profile/UpComingRide';
const Profile = () => {
  const { user, token  } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.username);
  const [id, setId] = useState(user._id);
  const [display, setDisplay] = useState(user?.displayPic?.[0]);
  const [image, setImage] = useState([]);
  const [mail, setMail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [showMyVehicles, setShowMyVehicles] = useState(false);
  const [showMyConnection, setShowMyConnection] = useState(false);
  const [showRideHistory, setShowRideHistory] = useState(false);
  const [showUpComingRide, setShowUpComingRide] = useState(false);
 const dispatch =useDispatch()
  //const [image, setImage] = useState(null);
console.log(user,"user getttttttttttttttttttt");
  // Use useEffect to set state values when the component mounts
  // useEffect(() => {
  //   // setName(user.username);
  //   // setMail(user.email);
  //   // setMobile(user.mobile);
  //   setId(user._id);
    
  //   async function fetchData() {
  //     try {
  //       const options = {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       };
  //       // Assuming you want to send the newUsername to the server
  //       const data = await userInstance.get(`/getProfile/${id}`, options);
  // console.log('====================================');
  // console.log(data.data);
  // console.log('====================================');
  //       // Update the state with the fetched data
  //       setName(data.data.username); // Replace with the actual property name
  //       setMail(data.data.email); // Replace with the actual property name
  //       setMobile(data.data.mobile); // Replace with the actual property name
  //       setDisplay(data.data.displayPic[0]); // Replace with the actual property name
  //       // Update other state values as neede
  
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  
  //   fetchData(); // Call the async function
  // }, [name]);
  



  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef.current.click();
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
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set the content type for FormData
        },
      };
  
      // Include the user ID in the URL
      const response = await userInstance.put(`/profile/${id}`, formData, options);
      console.log(response,"????");
      setDisplay(response.data.data)
      dispatch(changeuserDp( response.data.data))
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

  const ChangeBackground=async(e)=>{
    const file =e.target.files[0]
    setFileToBase(file)
    console.log(file);
}
const setFileToBase =(file)=>{
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    setImage(reader.result)
    ChangeWallpaper(reader.result);
  } 
}
const ChangeWallpaper =async(image)=>{
  console.log(image,"jjd");
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // Assuming you want to send the newUsername to the server
    
    const data = await userInstance.put(`/changeWallpapper/${id}`,{image}, options);
    console.log(data,":::::::");
   //dispatch(changeuserName( data.data))
  } catch (error) {
    console.error(error);
    throw new Error(error.message); // This will show an error message in the Swal dialog
  }
}



  const ChangeName = async () => {
    try {
      const { value: newUsername } = await Swal.fire({
        title: 'Submit your New username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Done',
        showLoaderOnConfirm: true,
        preConfirm: async (newUsername) => {
          try {
            const options = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            // Assuming you want to send the newUsername to the server
            const data = await userInstance.put(`/changeName/${id}`, { newUsername }, options);
            dispatch(changeuserName( data.data))
          } catch (error) {
            console.error(error);
            throw new Error(error.message); // This will show an error message in the Swal dialog
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      setName(newUsername)
      if (newUsername) {
        Swal.fire({
          title: `${newUsername}'s your new name`,
          
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  
  const ChangeEmail = async () => {
    try {
      const { value: newUsername } = await Swal.fire({
        title: 'Submit your New username',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Done',
        showLoaderOnConfirm: true,
        preConfirm: async (newUsername) => {
          try {
            const options = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            // Assuming you want to send the newUsername to the server
            const data = await userInstance.put(`/changeEmail/${id}`, { newUsername }, options);
            dispatch(changeuserEmail( data.data))
          } catch (error) {
            console.error(error);
            throw new Error(error.message); // This will show an error message in the Swal dialog
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      setMail(newUsername)
      if (newUsername) {
        Swal.fire({
          title: `${newUsername}'s your new name`,
          
        });
      }
    } catch (error) {
      console.error(error);
    }
  };




  const ChangeNumber = async () => {
    try {
      const { value: newUsername } = await Swal.fire({
        title: 'Submit your New Number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Done',
        showLoaderOnConfirm: true,
        preConfirm: async (newUsername) => {
          try {
            const options = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            // Assuming you want to send the newUsername to the server
            const data = await userInstance.put(`/changeEmail/${id}`, { newUsername }, options);
            dispatch(changeuserNumber( data.data))
            setMobile(data.data);
          } catch (error) {
            console.error(error);
            throw new Error(error.message); // This will show an error message in the Swal dialog
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      setMobile(newUsername)
      if (newUsername) {
        Swal.fire({
          title: `${newUsername}'s your new number`,
          
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyVehiclesClick = () => {
    setShowMyVehicles(true);
    setShowMyConnection(false);
    setShowRideHistory(false)
    setShowUpComingRide(false)
  };

  const handleMyConnectionsClick = () => {
    setShowMyConnection(true);
    setShowMyVehicles(false);
    setShowRideHistory(false)
    setShowUpComingRide(false)
  };  

  const handleRidehistoryClick =()=>{
    setShowRideHistory(true)
    setShowMyConnection(false);
    setShowMyVehicles(false);
    setShowUpComingRide(false)
  }

  const handleUpcomingRidesClick =()=>{
    setShowUpComingRide(true)
    setShowMyConnection(false);
    setShowMyVehicles(false);
    setShowRideHistory(false)
    
  }
  //  // Function to toggle theme
  //  const toggleTheme = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  // // Define the theme class based on the state
  // const themeClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900';

  return (
    <div>
      <Navbar />




<div className={`font-sans antialiased leading-normal tracking-wider bg-cover `} style={{ backgroundImage: `url('https://source.unsplash.com/1L71sPT5XKc')` }}>
<label className="mr-auto w-7 h-7 text-slate-400 cursor-pointer">
    <FiEdit  />
    <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={ChangeBackground}
    />
</label>

      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
        {/* Main Col */}
        <div id="profile" className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl opacity-75 mx-6 lg:mx-0">
          <div className="p-4 md:p-12 text-center lg:text-left bg-slate-500">
            {/* Image for mobile view */}
            <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{
                 backgroundImage: `url(${display?.startsWith('http') ? display : `http://localhost:5000/images/${display}`})`}}></div>
            <h1 className="text-3xl font-bold pt-8 lg:pt-0">{name}</h1>
            <FiEdit className="ml-auto " onClick={ChangeName} />
            <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
              <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                {/* Path for "What you do" icon */}
              </svg>
              {mail}
              <FiEdit className="ml-auto" onClick={ChangeEmail} />
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
              <svg className="h-4 fill-current text-green-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                {/* Path for "Your Location" icon */}
              </svg>
              {mobile}
              <FiEdit className="ml-auto" onClick={ChangeNumber} /> 
            </p>
            <p className="pt-8 text-sm">Totally optional short description about yourself, what you do, and so on.</p>
            <div className="pt-12 pb-8 flex">
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleMyVehiclesClick}
              >
              My Vehicles
              </button>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleMyConnectionsClick}
              >
                My Connections
              </button>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleRidehistoryClick}
              >
                Ride history
              </button>
              <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleUpcomingRidesClick}
              >
                Upcoming Rides
              </button>
            </div>
            
          </div>
        </div>
        {/* Img Col */}
        <div className="w-full lg:w-2/5">
          {/* Big profile image for side bar (desktop) */}
          {display ? (
          <img  
          src={display.startsWith('http') ? display : `http://localhost:5000/images/${display}`}
          alt="Profile" 
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block" 
          onClick={openFileInput}
          />
          ) : (
            <img
              src={logoo}
              alt="Profile"
              className="w-full h-128"
              onClick={openFileInput}
            />
          )}
           <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        </div>
       
      </div>
      
    </div>

{showMyVehicles && <Myvehicle/>}
{showMyConnection && <MyConnection/>}
{showRideHistory && <RideHistory/>}
{showUpComingRide && <UpComingRide/>}

<Footer/>
    </div>
  );
};

export default Profile;
