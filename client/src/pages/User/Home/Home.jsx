import React from 'react';
import Navbar from '../../../components/User/navbar/Navbar';
import Slogon from '../../../components/User/slogon/Slogon';
import Search from '../../../components/User/search/search';
import Vedio from '../../../components/User/vedioContent/vedio';
import Navigation from '../../../components/User/navigation/Navigation';
import Footer from '../../../components/User/footer/footer';
import Story from '../../../components/User/story/Story';
const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mb-6">
        <Slogon />
      </div>
      {/* <div className="mb-6">
        <Search />
      </div> */}
      <div className="mb-6">
        <Vedio />
      </div>
      <div className="mb-6">
        <Navigation />
      </div>
      <Story />
      <Footer />
    </div>
  );
};

export default Home;
