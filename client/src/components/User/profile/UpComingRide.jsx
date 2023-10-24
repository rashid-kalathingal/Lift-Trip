import React, { useEffect, useState } from 'react';
import { userInstance } from '../../../utils/axiosApi';
import { useSelector } from 'react-redux';

const UpComingRide = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [rides, setRides] = useState([]);

  async function fetchData() {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await userInstance.get(
        `/myrideinfo/${user._id}`,
        options
      );

      console.log(response.data, '💕💕💕💕💕');
      const currentDate = new Date(); // Get the current date and time

      // Filter the response data to retain only records with dates in the future
      const upcomingData = response.data.filter((item) => {
        const itemDate = new Date(item.rideInfo.date); // Convert the date string to a Date object
        return itemDate > currentDate; // Compare the item's date with the current date
      });
      setRides(upcomingData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user && user._id) {
      fetchData();
    }
  }, [user, token]);
  return (
    <>
      <section className="container mx-auto p-10 md:p-20 grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-y-10 transform duration-500">
        {rides.map((ride, index) => (
          <article
            key={index}
            className="shadow-md mx-auto max-w-sm transform hover:-translate-y-1 duration-300 hover:shadow-xl cursor-pointer">
            <div className="max-h-140 overflow-hidden">
              <img
                className="w-full h-auto"
                src={ride.rideInfo.VehicleImage[0]}
                alt=""
              />
            </div>
            <div className="p-7 my-auto pb-12 ">
              <h1 className="text-2xl font-semibold text-gray-700">
                {ride.rideInfo.date}
              </h1>
              <h1 className="text-2xl font-semibold text-gray-700">
                {ride.rideInfo.pickUp} - {ride.rideInfo.dropOff}{' '}
              </h1>
              <p className="text-xl font-light leading-relaxed text-gray-400 mt-5">
                Vehicle Number: {ride.rideInfo.VehicleNumber}
                <br />
                Number of Seats: {ride.rideInfo.NumberOfSeats}
                <br />
                Available Space: {ride.rideInfo.AvailableSpace}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default UpComingRide;
