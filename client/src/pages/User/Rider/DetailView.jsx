import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { userInstance, setAccessToken } from '../../../utils/axiosApi';
import Navbar from '../../../components/User/navbar/Navbar';
import Footer from '../../../components/User/footer/footer';
import DriverUser from '../../../components/User/Driver/driver/Driver';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DetailView = () => {
  const { id } = useParams();
  const [ride, setRide] = useState('');
  const [notification, setNotification] = useState('');
  const [review, setReview] = useState([]);
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // const options = {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // };
        setAccessToken(token);
        const response = await userInstance.get(`/getsinglerides/:${id}`);
        console.log(response.data, '////////////');
        setRide(response.data);
        const reviewsResponse = await userInstance.get(
          `/getreviews/:${user._id}`
        );
        console.log(reviewsResponse.data, '?????????????');
        setReview(reviewsResponse.data);
        // Update your rides state here if needed:
      } catch (error) {
        console.error(error);
      }
    };

    fetchRides();
  }, []);
  //console.log(review,"👌👌");
  const makeConnection = async () => {
    const DriverId = ride.user._id;
    const RiderId = user._id;
    const RideInfoId = id;

    if (!user.displayPic[0]) {
      return toast.error('Add your Dp');
    }
    // console.log(RiderId, "rider");
    // console.log(DriverId, "driver");
    // console.log('Connection made!');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire('Make it!', 'Created a Connection.', 'success');
        try {
          // const options = {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // };

          // Define the request body data
          const Data = {
            DriverId: DriverId,
            RiderId: RiderId,
            RideInfo: RideInfoId,
          };

          // Make the API request with the request body data
          setAccessToken(token);
          const response = await userInstance.post('/makeConnection', Data);

          navigate('/rider');
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <>
      <Navbar />

      <div className="grid md:grid-cols-6 gap-3 bg-stone-800">
        <div className="md:col-span-4 pt-4 pl-4 pb-4">
          <div className="flex flex-wrap w-full gap-4 justify-center  bg-cyan-950/70 py-4 shadow-2xl  ">
            <div className="w-full md:w-5/12">
              {ride.VehicleImage && ride.VehicleImage[0] ? (
                <img
                  className="rounded-t-lg  px-2 aspect-video w-full"
                  src={ride.VehicleImage[0]}
                  alt=""
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="w-full px-2  md:w-1/2">
              <div className="leading-8 text-ellipsis">
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Vehicle Model: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.VehicleModel}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Vehicle Number: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}> {ride.VehicleNumber}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Number of Seats: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}> {ride.NumberOfSeats}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Available Space: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.AvailableSpace}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Documents: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}> Verified</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Date: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.date}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Payment Way: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.Payment}</span></h5>
              <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Instructions: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.Instruction}</span></h5>
              </div>
            </div>
          </div>

          <div className=" flex flex-wrap w-full gap-4 justify-center bg-cyan-950/70 py-4 shadow-2xl  mt-4">
            <div className="w-full md:w-5/12">
              {ride.VehicleImage && ride.VehicleImage[0] ? (
                <img
                  className="rounded-t-lg  px-2 aspect-video w-full"
                  src={ride.user.displayPic[0]}
                  alt=""
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="w-full px-2  md:w-1/2">
              <div className="leading-8 text-ellipsis">
                {ride.user ? (
                  <>
                    <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Driver Name: </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.user.username}</span></h5>
                    <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Driver Number : </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.user.mobile}</span></h5>
                    <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Driver Email : </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>{ride.user.email}</span></h5>
                  </>
                ) : (
                  <p>Driver information not available</p>
                )}
                <h5><span style={{ color: 'purple', fontFamily: 'Courier New' }}>Documents : </span><span style={{ color: 'white', fontFamily: 'Tahoma' }}>Verified</span></h5>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full md:col-span-2 p-4 md:px-8 overflow-auto ">
          {review.map((data, index) => (
            <div
              key={index}
              className="relative flex w-full px-2.5 flex-col rounded-xl bg-clip-border border border-gray-300 bg-slate-400  text-gray-700 shadow-none  my-4">
              <div className="relative mx-0 mt-4 flex items-center gap-4 overflow-hidden rounded-xl bg-transparent bg-clip-border pt-0 pb-8 text-gray-700 shadow-none">
                {data.Driver ? (
                  <img
                    src={data.Driver.displayPic[0]}
                    alt=""
                    className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
                  />
                ) : (
                  <img
                    src={data.Rider.displayPic[0]}
                    alt=""
                    className="relative inline-block h-[58px] w-[58px] !rounded-full object-cover object-center"
                  />
                )}

                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    {data.Driver ? (
                      <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {data.Driver.username}
                      </h5>
                    ) : (
                      <h5 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {data.Rider.username}
                      </h5>
                    )}

                    <div className="flex items-center gap-0 pr-10">
                      {[...Array(data.star)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-5 w-5 text-yellow-700">
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                  {/* <p className="block font-sans text-base font-light leading-relaxed text-blue-gray-900 antialiased">
               Frontend Lead @ Google
             </p> */}
                </div>
              </div>
              <div className="mb-6 p-0">
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {data.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        {' '}
        <DriverUser header={'Rider Details'} />{' '}
      </div>

      <div className="flex justify-center items-center">
        <a
          href="#_"
          className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group"
          onClick={makeConnection} // Add onClick event handler
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-purple-500 transition-all duration-300 transform group-hover:translate-x-full ease">
            Lets Go..
          </span>
          <span className="relative invisible">Lets Go..</span>
        </a>
      </div>

      <Footer />
    </>
  );
};

export default DetailView;
