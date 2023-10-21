import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../../../assets/gettyimages-1.jpg';
import image2 from '../../../assets/gettyimages-2.jpg';
import image3 from '../../../assets/gettyimages-3.jpg';
import image4 from '../../../assets/gettyimages-4.jpg';
import image5 from '../../../assets/gettyimages-5.jpg';
import './slogon.css';
const Slogan = () => {
  return (
    <div className="w-full">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        interval={3000}
        autoPlay={true}>
        <div>
          <img src={image1} alt="Slide 1" className="carousel-image" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="carousel-image" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="carousel-image" />
        </div>
        <div>
          <img src={image4} alt="Slide 3" className="carousel-image" />
        </div>
        <div>
          <img src={image5} alt="Slide 3" className="carousel-image" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slogan;
