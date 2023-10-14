import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 pl-20 ">
      <div className="container mx-auto grid grid-cols-3 gap-8 ">
        <div>
          <h2 className="font-bold text-xl mb-4">Driver</h2>
          <ul>New Driver Guide</ul>
          <ul>Cities</ul>
          <ul>Help</ul>
          <ul>Safety</ul>
          <ul>Application Requirements</ul>
          <ul>Lift_Trip Rewards</ul>
          <ul>Driving Opportunities</ul>
          <ul>Driver Blog</ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Rider</h2>
          <ul>Fare Estimate</ul>
          <ul>Lift_Trip Pink</ul>
          <ul>Cities</ul>
          <ul>Help</ul>
          <ul>Safety</ul>
          <ul>Rewards</ul>
          <ul>Gift Cards</ul>
          <ul>Blog</ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Lift_Trip</h2>
          <ul>Careers</ul>
          <ul>Lyft Up</ul>
          <ul>Healthcare</ul>
          <ul>Bikes</ul>
          <ul>Cars</ul>
          <ul>Lyft Media</ul>
          <ul>Developers</ul>
        </div>
      </div>
      <div className="text-xs text-center mt-8 pl-0">
        <span className="font-bold text-lg">LiftTrip.</span>
        <span>@LiftTrip International Ltd. 2023</span>
      </div>
    </footer>
  );
};

export default Footer;
