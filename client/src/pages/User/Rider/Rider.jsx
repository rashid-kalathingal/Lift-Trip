import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from 'react-redux'
import Navbar from '../../../components/User/navbar/Navbar';
// import Slogon from '../../../components/User/slogon/Slogon';
import Footer from '../../../components/User/footer/footer';
import DotLoader from 'react-spinners/DotLoader';
import Select from 'react-dropdown-select';
import { userInstance, setAccessToken } from '../../../utils/axiosApi';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Rider = () => {
  const [rides, setRides] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const ridesPerPage = 4; // Number of rides to show per page
  const [selectedPickUpOption, setSelectedPickUpOption] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedDropOffOption, setSelectedDropOffOption] = useState([]);
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
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
        const response = await userInstance.get('/getrides');
        const responses = await userInstance.get('/getplaces');
        setPlaces(responses.data)
        // Filter out past rides based on the date format 'YYYY-MM-DD'
        const currentDate = new Date();
        const filteredRides = response.data.filter((ride) => {
          const rideDate = new Date(ride.date);
          return rideDate >= currentDate && ride.user._id !== user._id;
        });

       
        setRides(filteredRides);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRides();
  }, [token, user._id]); // Add token as a dependency to re-fetch when it changes
  

  const placeOptions = places.map(place => ({
    value: place,
    label: place
  }));

  

  const handlePaymentOptionToggle = (paymentOption) => {
    if (selectedPaymentOptions.includes(paymentOption)) {
      // If the payment option is already selected, remove it
      setSelectedPaymentOptions((prevOptions) =>
        prevOptions.filter((option) => option !== paymentOption)
      );
    } else {
      // If the payment option is not selected, add it
      setSelectedPaymentOptions((prevOptions) => [
        ...prevOptions,
        paymentOption,
      ]);
    }
  };

  const filterRides = () => {
    const filteredRides = rides.filter((ride) => {
      const pickUpMatch =
        !selectedPickUpOption.length ||
        selectedPickUpOption.some((option) => option.value === ride.pickUp);

      const dropOffMatch =
        !selectedDropOffOption.length ||
        selectedDropOffOption.some((option) => option.value === ride.dropOff);

      const paymentMatch =
        selectedPaymentOptions.length === 0 ||
        selectedPaymentOptions.includes(ride.Payment.split(',')[0].trim());

      return pickUpMatch && dropOffMatch && paymentMatch;
    });
    if (sortByDate) {
      filteredRides.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return filteredRides;
  };

  const pageCount = Math.ceil(filterRides().length / ridesPerPage);
  const startIndex = pageNumber * ridesPerPage;
  const endIndex = startIndex + ridesPerPage;
  const displayedRides = filterRides().slice(startIndex, endIndex);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <Navbar />
      {/* <Slogon /> */}
      <div className="py-4 bg-sky-100  flex flex-wrap items-center justify-center gap-5 mt-3">
        <div className="relative w-[200px] mb-1.5  inline-flex items-center">
          {/* First Dropdown */}
          <Select
            options={placeOptions}
            values={selectedPickUpOption}
            onChange={(values) => setSelectedPickUpOption(values)}
            placeholder="Enter Pick-Up Location"
            dropdownHandle={false}
            style={{ width: '200px' }}
          />
        </div>

        <div className="relative w-[200px] mb-1.5  inline-flex items-center">
          {/* Second Dropdown */}
          <Select
            options={placeOptions}
            values={selectedDropOffOption}
            onChange={(values) => setSelectedDropOffOption(values)}
            placeholder="Enter Drop-Off Location"
            dropdownHandle={false}
            style={{ width: '200px' }}
          />
        </div>

        <label className="relative w-[200px] mb-1.5  inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={sortByDate}
            onChange={() => setSortByDate(!sortByDate)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Sorted By Date
          </span>
        </label>

        <label className="relative w-[200px] mb-1.5  inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedPaymentOptions.includes('Free Drive')}
            onChange={() => handlePaymentOptionToggle('Free Drive')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Payment : Free Drive
          </span>
        </label>

        <label className="relative w-[200px] mb-1.5  inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedPaymentOptions.includes('Shared Drive')}
            onChange={() => handlePaymentOptionToggle('Shared Drive')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Payment : Shared{' '}
          </span>
        </label>

        <label className="relative w-[200px] mb-1.5  inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={selectedPaymentOptions.includes('Need Payment')}
            onChange={() => handlePaymentOptionToggle('Need Payment')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[10px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Payment : With Payment{' '}
          </span>
        </label>
      </div>

      {displayedRides.length > 0 ? (
        <section className="container mx-auto p-10 md:py-20 px-5 md:p-10 md:px-0 bg-zinc-100">
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 ">
            {displayedRides.map((ride, index) => (
              <article
                key={index}
                className="mx-auto pb-5 max-w-sm transform duration-500 hover:-translate-y-1 cursor-pointer group pl-6">
                <div className="max-h-125 overflow-hidden">
                  <img
                    className="transform duration-300 group-hover:scale-110"
                    src={ride.VehicleImage[0]}
                    alt=""
                  />
                </div>
                <div className="flex justify-between my-5">
                  <div className="text-orange-500 text-base font-semibold">
                    Driver Name: {ride.user.username}
                  </div>
                  
                </div>
                <h2 className="font-bold text-2xl">
                  {ride.pickUp} To {ride.dropOff}
                </h2>

                <div className="flex flex-col mt-3">
                  <p className="text-base uppercase font-semibold text-gray-500 pt-3">
                    Number of Seats: {ride.NumberOfSeats}
                  </p>
                  <p className="text-base uppercase font-semibold text-gray-500 pt-3">
                    Ride Date: {ride.date}
                  </p>
                  <p className="text-base uppercase font-semibold text-gray-500 pt-3 pb-3">
                    Payment Method: {ride.Payment}
                  </p>
                </div>

                <Link to={`/detailView/${ride._id}`}>
                  <a
                    href="#"
                    className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </Link>
              </article>
            ))}
          </section>
        </section>
      ) : (
        <DotLoader />
      )}

      <div className=" flex items-center justify-center mt-7">
        <ReactPaginate
          previousLabel={
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </a>
          }
          nextLabel={
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </a>
          }
          breakLabel={<a href="#">...</a>}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'inline-flex -space-x-px text-sm'}
          activeClassName={
            'border border-gray-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
          }
          pageClassName={
            'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          }
        />
      </div>

      <Footer />
    </div>
  );
};

export default Rider;
