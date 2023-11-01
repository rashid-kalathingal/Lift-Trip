import React, { useEffect, useState } from 'react';
import { request } from '../../../utils/fetchApi';
import { useSelector } from 'react-redux';
import { FiUser, FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { adminInstance } from '../../../utils/axiosApi';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // To track the selected user
  const { token } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    // Fetch users and set them in the state
    const fetchUsers = async () => {
      try {
        const options = {
          Authorization: `Bearer ${token}`,
        };
        const data = await request('/adminAuth/getAllUser', 'GET', options);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [token]);

  const AddPlace = async () => {
    try {
      const { value: place } = await Swal.fire({
        title: 'Submit your Location',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        confirmButtonText: 'Done',
        showLoaderOnConfirm: true,
        preConfirm: async (place) => {
          try {
            const options = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            // Assuming you want to send the place to the server
            const data = await adminInstance.post(
              `/addplace`,
              { place },
              options
            );
          
          } catch (error) {
            console.error(error);
            throw new Error(error.message); // This will show an error message in the Swal dialog
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    
      if (place) {
        Swal.fire({
          title: `${place}'s new place`,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleBlockToggle = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change Status it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Changed!', 'User Status Changed.', 'success');
        // Handle blocking/unblocking logic
        try {
          const options = {
            Authorization: `Bearer ${token}`,
          };
          const updatedStatus = await request(
            `/adminAuth/handleBlock/${id}`,
            'PUT',
            options
          );

          setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) => {
              if (user._id === id) {
                return {
                  ...user,
                  isBlocked: updatedStatus,
                };
              }
              return user;
            });
            return updatedUsers;
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const openUserProfileModal = (user) => {
    // Set the selected user when the profile icon is clicked
    setSelectedUser(user);
  };

  const closeUserProfileModal = () => {
    // Clear the selected user to close the modal
    setSelectedUser(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <button type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={AddPlace }>Add New Place</button>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Mail ID
            </th>
            <th scope="col" className="px-6 py-3">
              profile
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {user.username}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button onClick={() => openUserProfileModal(user)}>
                    <FiUser size={26} color="blue" />
                  </button>
                </td>
                <td className="px-6 py-4">
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </td>
                <td className="px-6 py-4">
                  <button
                    className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${
                      user.isBlocked
                        ? 'text-red-600 dark:text-red-500'
                        : 'text-green-600 dark:text-green-500'
                    }`}
                    onClick={() => handleBlockToggle(user._id)}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-70"></div>
          <div className="bg-white rounded-lg p-6 w-full max-w-md z-50 overflow-y-auto">
            <div className="flex justify-end">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeUserProfileModal}>
                <FiX size={20} />
              </button>
            </div>
            <div className="mt-4">
              {/* Display user details here */}
              <h2 className="text-xl font-semibold">{selectedUser.username}</h2>
              <p className="text-gray-500">{selectedUser.email}</p>
              {/* Add more user details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
