import React from 'react';
import { Link } from 'react-router-dom';
import driver from '../../../assets/driver.jpg';
import rider from '../../../assets/ride.jpg';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const Navigation = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // 10% of the element is visible
  });

  return (
    <motion.div
      className="bg-stone-50 flex justify-center items-center"
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
      }}>
      <div className="bg-blue-100 w-9/12 px-8 py-24 flex flex-wrap justify-between space-x-8 items-center">
        <div className="text-indigo-950 flex  items-center">
          <p className="max-w-lg mb-8">
            "On open roads, destiny awaits, as hitchhiking threads lives
            together at crossroads". "Two worlds converge as a thumb meets a
            ride, forging connections unforeseen". "Hitchhiking: a tapestry of
            chance encounters, weaving tales of trust and adventure". "Through
            outstretched thumbs and fleeting rides, hitchhiking paints stories
            of human bonds."
          </p>
        </div>
        <div className="flex flex-wrap space-x-20 ">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/driver">
              <img className="w-52 h-36" src={driver} alt="driver" />
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link to="/rider">
              <img className="w-52 h-36" src={rider} alt="ride" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navigation;
