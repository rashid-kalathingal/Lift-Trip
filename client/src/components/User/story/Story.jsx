import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../../assets/xx.png';
import image2 from '../../../assets/Company.png';
import image3 from '../../../assets/Company (1).png';
import image4 from '../../../assets/Company (2).png';

const Slogan = () => {
  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        interval={2000}
        autoPlay={true}
        stopOnHover={true}>
        <div className="pl-14 pr-14 pt-14 pb-14">
          <img src={image1} alt="Slide 1" className="carousel-image" />
        </div>
        <div className="pl-14 pr-14 pt-14 pb-14">
          <img src={image2} alt="Slide 2" className="carousel-image" />
        </div>
        <div className="pl-14 pr-14 pt-14 pb-14">
          <img src={image3} alt="Slide 3" className="carousel-image" />
        </div>
        <div className="pl-14 pr-14 pt-14 pb-14">
          <img src={image4} alt="Slide 3" className="carousel-image" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slogan;
