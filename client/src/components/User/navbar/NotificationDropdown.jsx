import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userInstance } from "../../../utils/axiosApi";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'
const DropdownNotification = ({data}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
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
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen]);



  const handleAccept = async(Id,element) => {
   const li=element.parentElement.parentElement
    console.log(Id ,'accept clicked');
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      li.remove()
      const response = await userInstance.put(`/acceptconnection/${Id}`, options);
      if(response){
          Swal.fire(
             'Success',
        'Making a New Connection',
           'success'
        )
      }
     
  }catch(error){
    console.log(error);
  }}
  const handleReject = async (Id,element) => {
    console.log(Id ,'rejct clicked');
    const li=element.parentElement.parentElement
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      li.remove()
      const response = await userInstance.put(`/rejectionconnection/${Id}`, options);
      // if(response){
      //     Swal.fire(
      //        'Success',
      //   'Making a New Connection',
      //      'success'
      //   )
      // }
     
  }catch(error){
    console.log(error);
  }
  };
  





  return (
    <>
     <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8 w-8 items-center justify-center rounded-full hover:scale-105"
      >
        <svg
          className="fill-white duration-300 ease-in-out"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 top-12 flex h-80 w-72 mr-80 mt-8 flex-col rounded-sm bg-sky-100 z-40 sm:right-0 sm:w-80  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3 border-b-2 ">
          <h5 className="text-sm font-medium">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto invisible-scrollbar">
          
          
{Array.from(data).flat().map((item, index) => (
  <li key={index} className="py-3 sm:py-4">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full"
          src={`http://localhost:5000/images/${item.riderId.displayPic[0]}`}
          alt={`${item.riderId.username}'s Profile Pic`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {item.riderId.username}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {item.riderId.email}
        </p>
      </div>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-3 py-2 text-xs mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={(e) => handleAccept(item._id,e.target)}
      >
        Accept
      </button>
      <button
        type="button"
        onClick={(e) => handleReject(item._id,e.target)}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg px-3 py-2 text-xs mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Reject
      </button>
    </div>
  </li>
))}

        </ul>
        
      </div>
    </>
     
    
  );
};

export default DropdownNotification;
