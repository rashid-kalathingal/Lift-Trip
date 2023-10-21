import React, { useEffect, useState } from 'react';
import { userInstance } from '../../../utils/axiosApi';
import { useSelector } from 'react-redux';

const MyConnection = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [connections, setConnections] = useState([]);

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

      console.log(response.data, '??>>>🔥🔥🔥');

      setConnections(response.data);
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
    <div>
      <section className="container mx-auto p-10 md:py-20 px-0 md:p-20 md:px-0 antialiased">
        {connections && (
          <section className="grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-40 ">
            {connections?.map((item) => (
              <article
                key={item._id}
                className="mx-auto max-w-sm shadow-xl bg-cover bg-center w-96 min-h-150 transform duration-500 hover:-translate-y-2 cursor-pointer group"
                style={{
                  backgroundImage: `url(http://localhost:5000/images/${item.userDetails.displayPic[0]})`,
                }}>
                <div className="bg-black bg-opacity-20 min-h-150 px-10 flex flex-wrap flex-col pt-96 hover:bg-opacity-75 transform duration-300">
                  <h1 className="text-white text-3xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                    {item.userDetails.username}
                  </h1>
                  <div className="w-16 h-2 bg-yellow-500 rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
                  <p className="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500">
                    {item.userDetails.email}
                    <br />
                    {item.userDetails.mobile}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </div>
  );
};

export default MyConnection;
