import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userInstance, setAccessToken } from '../../../utils/axiosApi';
import Navbar from '../../../components/User/navbar/Navbar';
import { LuAlignJustify } from 'react-icons/lu';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import Swal from 'sweetalert2';
import Chat from './Chat';
import { FiX } from 'react-icons/fi';
import Footer from '../../../components/User/footer/footer';

//import io from 'socket.io-client'
import { ChatState } from '../../../Context/ChatProvider';
import BounceLoader from 'react-spinners/BounceLoader';
import DotLoader from 'react-spinners/DotLoader';
//const socket = io.connect("http://localhost:5000")

const Connections = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChatId, setSelectedChatId] = useState('');
  const initialDropdownStates = Array(connections.length).fill(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(initialDropdownStates);
  const dropdownRef = useRef(null);
  const listRef = useRef(null)
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handlereviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    // You can access the comment value from the `comment` state here and perform any actions (e.g., submit to a server).
    console.log('Comment submitted:', review);
    console.log('rating submitted:', rating);
    console.log('mitted:', data);
    console.log('bmitted:', user._id);
    const body = {
      Review: review,
      Rating: rating,
      user1Id: data,
      user2Id: user._id,
    };

    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    setAccessToken(token);
    const chatId = await userInstance.post(`/submitReview`, body);
    setRating(0);
    setReview('');
    setSelectedUserId(null);
  };

  const clickHandler = async (data) => {
    // Get an array of child elements
const childs = Array.from(listRef.current.children);

// Remove all child elements from the parent
childs.forEach(child => {
  listRef.current.removeChild(child);
});

// Now, you can append the parent or any other element
listRef.current.appendChild(parent);

// Reappend the child elements
childs.forEach(child => {
  if(child !== parent){
    listRef.current.appendChild(child);
  }
});
    setSelectedUser(data.username);
    // const options = {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    //setAccessToken(token)
    const chatId = await userInstance.get(
      `/getChatId?Id1=${data._id}&Id2=${user._id}`
    );
    console.log(chatId.data.chatId, '???????');
    setSelectedChatId(chatId.data.chatId);
    setSelectedChat(chatId.data.chatId);
  };
  console.log(selectedChatId, 'eee');
  // Function to fetch user data
  async function fetchData() {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await userInstance.get(
        `/getActiveConnections/${user._id}`,
        options
      );
      const chats = await userInstance.get(`/getallChat/${user._id}`, options);
      console.log(response.data, '??>>>');
      console.log(chats.data, '>>>');
      setConnections(response.data);
      setChats(chats.data);
      //   console.log(Chat,"////");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      fetchData();
    }
  }, [user, token]);

  const OpenClickOption = (itemId) => {
    setSelectedUserId(itemId);
  };
  const CloseClickOption = (itemId) => {
    setSelectedUserId(null);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const ComformOption = async (itemId, Ride) => {
    const Payment = Ride.Payment;
    if (Payment.includes('Need Payment')) {
      const amount = Payment.split('Need Payment')[1]
        .trim()
        .replace(/[, ]/g, '');
      const shortAmount = amount * 0.1;
      // console.log('====================================');
      // console.log(amount);
      // console.log('====================================');
      Swal.fire({
        title: `Are You Ready to pay ${shortAmount} `,
        text: `This Amount Only 10% of a ${amount}, balance amount Pay After Ride`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, lets Ride!!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const body = {
              Id: user._id,
              PaymentInfo: amount,
              RideInfo: Ride,
            };

            // const options = {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // };

            const response = await userInstance.post(
              `/create-checkout-session`,
              body
            );

            if (response.data.url) {
              window.location.href = response.data.url;
              const body = {
                ConnectionId: itemId,
                PaymentInfo: Payment,
              };
              const options = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              };

              const response2 = await userInstance.put(
                `/comformRide`,
                body,
                options
              );
            } else {
              console.error('The response does not contain a URL.');
            }
          } catch (error) {
            console.error('An error occurred:', error.message);
          }

          Swal.fire('Success!', 'Your Ride is conformed.', 'success');
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure for Ride?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, lets Ride!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const body = {
            ConnectionId: itemId,
            PaymentInfo: Payment,
          };
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await userInstance.put(
            `/comformRide`,
            body,
            options
          );
        }
        Swal.fire('Success!', 'Your Ride is conformed.', 'success');
      });
    }
  };

  ////////////////////////////////////////////////////////

  const clickConnectionBlock = async (itemId, element) => {
    const li =
      element.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement;
    console.log(li, 'kk');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!',
    }).then(async (result) => {
      try {
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await userInstance.put(
          `/blockUserbyUser?Id1=${itemId}&Id2=${user._id}`,
          options
        );
        li.remove();
      } catch (error) {
        console.error(error);
      }
      if (result.isConfirmed) {
        Swal.fire('Blocked!', 'Your Connection has been Blocked.', 'success');
      }
    });
  };

  // Function to toggle the dropdown for a specific item
  const toggleDropdown = (index) => {
    const updatedDropdownStates = [...isDropdownOpen];
    updatedDropdownStates[index] = !updatedDropdownStates[index];
    setIsDropdownOpen(updatedDropdownStates);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(initialDropdownStates);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  console.log('====================================');
  console.log(connections, '🔥🔥🔥');
  console.log('====================================');

  return (
    <>
      <Navbar />

      <div className="grid md:grid-cols-6" style={{ minHeight: '660px' }}>
        <div className="col-span-2 relative ">
          {connections.length > 0 ? (
            <ul className="pt-3 pl-2"ref={listRef}>
              {connections.map((item, index) => (
                <li
                  key={item._id}
                  className={`mb-5 pt-3 px-5 py-3 sm:py-4 rounded-full flex items-center justify-between ${
                    item.rideInfo.user !== item.userDetails._id
                      ? 'bg-emerald-800'
                      : 'bg-zinc-500'
                  }`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={item.userDetails.displayPic[0]}
                        alt={`${item.username}'s Profile Pic`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.userDetails.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.userDetails.email}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.rideInfo.date}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.rideInfo.pickUp} To {item.rideInfo.dropOff}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-4"  onClick={(e) => {
                        clickHandler(e.currentTarget.parentElement,item.userDetails);
                      }}>
                    <HiChatBubbleLeftRight
  
                    />

                    <div className="relative">
                      <LuAlignJustify onClick={() => toggleDropdown(index)} />
                      {isDropdownOpen[index] && (
                        <div
                          ref={dropdownRef}
                          className="absolute z-40 right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            {item.rideInfo.user == item.userDetails._id ? (
                              <li>
                                <a
                                  href="#"
                                  onClick={() =>
                                    ComformOption(
                                      item.connectionId,
                                      item.rideInfo
                                    )
                                  }
                                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  Confirm Ride
                                </a>
                              </li>
                            ) : null}

                            <li>
                              <a
                                href="#"
                                onClick={(e) =>
                                  clickConnectionBlock(
                                    item.userDetails._id,
                                    e.target
                                  )
                                }
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                UnFollow
                              </a>
                            </li>

                            <li>
                              <a
                                href="#"
                                onClick={() =>
                                  OpenClickOption(item.userDetails._id)
                                }
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                Review
                              </a>
                            </li>
                          </ul>
                          {selectedUserId && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 opacity-70"></div>
                              <div className="bg-white rounded-lg p-6 w-full max-w-md z-50 overflow-y-auto">
                                <div className="flex justify-end">
                                  <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={CloseClickOption}>
                                    <FiX size={20} />
                                  </button>
                                </div>
                                <div className="mt-4">
                                  <div className="flex flex-row-reverse justify-center p-8">
                                    {[5, 4, 3, 2, 1].map((value) => (
                                      <span
                                        key={value}
                                        onClick={() => handleRatingClick(value)}
                                        className={`w-6 h-6 mx-2 cursor-pointer text-2xl ${
                                          rating >= value
                                            ? 'text-yellow-500'
                                            : ''
                                        }`}
                                        style={{ lineHeight: '1' }} // Center the star vertically
                                      >
                                        &#9733;
                                      </span>
                                    ))}
                                  </div>

                                  <form
                                    onSubmit={(e) =>
                                      handleSubmit(e, item.userDetails._id)
                                    }>
                                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                      <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                        <label
                                          htmlFor="review"
                                          className="sr-only">
                                          Your review
                                        </label>
                                        <textarea
                                          id="review"
                                          rows="4"
                                          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                          placeholder="Write a review..."
                                          required
                                          value={review} // Bind the value of the textarea to the `review` state
                                          onChange={handlereviewChange} // Handle changes and update the `review` state
                                        ></textarea>
                                      </div>
                                      <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                        <button
                                          type="submit"
                                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                          Post review
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <DotLoader size={60} loading={true} />
            </div>
          )}
        </div>

        <div className="col-span-4  relative bg-slate-200">
          {selectedUser ? (
            <Chat selectedUser={selectedUser} selectedChatId={selectedChatId} />
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <BounceLoader size={60} loading={true} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Connections;
