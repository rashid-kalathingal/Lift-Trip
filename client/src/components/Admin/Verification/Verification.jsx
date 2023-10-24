import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { adminInstance } from '../../../utils/axiosApi';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { FaTimes, FaAngleRight } from 'react-icons/fa';
const Verification = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const { token } = useSelector((state) => state.adminAuth);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Fetch users and set them in the state when the component mounts
    if (!mounted) {
      const fetchUsers = async () => {
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await adminInstance.get(
            '/getUserVerification',
            options
          );
          const userData = response.data;
          console.log(userData, 'LLLLLLLLLLLLLLLL');
          setUsers(userData);
        } catch (error) {
          console.error(error.response);
        }
      };

      fetchUsers();
      setMounted(true); // Mark the component as mounted
    }
  }, [token, mounted]);

  console.log(users, '==================');
  // Function to open the modal
  const openModal = (user) => {
    console.log(user, 'llllllllllllllllllllllllll');
    setSelectedUser(user);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedUser(null);
  };

  const handleAcceptToggle = async (id, element) => {
    const tr = element.parentElement.parentElement;
    console.log(tr);
    let timerInterval;
    Swal.fire({
      title: 'Rider Verified!',
      html: 'Verification On process <b></b> milliseconds.',
      timer: 4000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector('b');
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });

    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      tr.remove();
      console.log('Successfully removed tr element.');
      const response = await adminInstance.put(`/accept/${id}`, options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectToggle = async (id, e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        try {
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await adminInstance.delete(`/reject/${id}`, options);
          // setUsers((prevUsers) => prevUsers.filter((user) => user.user._id !== id));
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const toggleImage = () => {
    setShowSecondImage(!showSecondImage);
  };

  // const removeUser = (userId) => {
  //   setUsers((prevUsers) => prevUsers.filter((user) => user.user._id !== userId));
  // };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Documents
              </th>
              <th scope="col" className="px-6 py-3">
                Verification
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.user.username}
                </td>
                <td className="px-6 py-4">{user.user.email}</td>
                <td className="px-6 py-4">{user.user.mobile}</td>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => openModal(user)}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                    Click
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={(e) => handleAcceptToggle(user._id, e.target)}>
                    Accept
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => handleRejectToggle(user._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="absolute top-16 left-80 flex items-center">
          <button className="text-black" onClick={closeModal}>
            <FaTimes className="text-2xl" />
          </button>
          {showSecondImage ? (
            <img
              src={selectedUser.VehicleRC[0]}
              alt="Vehicle RC"
              className="w-128 h-128 mt-2 rounded-lg object-cover"
            />
          ) : (
            <img
              src={selectedUser.VehicleInsurance[0]}
              alt="Vehicle Insurance"
              className="w-128 h-128 mt-2 rounded-lg object-cover"
            />
          )}
          <button className="text-black" onClick={toggleImage}>
            <FaAngleRight className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Verification;
