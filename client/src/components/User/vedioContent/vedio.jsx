import React from 'react';
import { FiCheck } from 'react-icons/fi';

const Video = () => {
  return (
    <div className="features bg-zinc-100 dark:bg-0d084d py-8 min-h-max">
      <div className="container w-1400 flex items-center gap-200">
        <div className="item flex-2 mt-14">
          <h1 className="font-bold mb-10 from-neutral-900">
            Hitchhiking offers a unique opportunity to embrace adventure, cultural exchange, and camaraderie with fellow travelers and locals alike.
          </h1>
          <div className="title flex items-center ml-11 font-semibold dark:text-slate-900">
            <FiCheck className="w-6 h-6 mr-2" />
            Cost-Effective
          </div>
          <p className="text-gray-600 dark:text-sky-950 mb-10 ml-8 mt-6">
            Hitchhiking is a budget-friendly way to travel as it allows you to save on transportation costs like fuel,
            public transportation fares, or rental fees.
          </p>
          <div className="title flex items-center ml-11 font-semibold text-gray-700 dark:text-slate-900">
            <FiCheck className="w-6 h-6 mr-2" />
            Adventure and Spontaneity
          </div>
          <p className="text-gray-600 dark:text-sky-950 mb-10 ml-8 mt-6">
            It brings a sense of adventure and unpredictability to your journey,
            as you never know who you'll meet or where you'll end up next.
          </p>
          <div className="title flex items-center ml-11 font-semibold text-gray-700 dark:text-slate-900">
            <FiCheck className="w-6 h-6 mr-2" />
            Meeting New People
          </div>
          <p className="text-gray-600 dark:text-sky-950 ml-8 mt-6">
            Hitchhiking allows you to meet a diverse range of people, forming connections and making new friends from different backgrounds.
          </p>
        </div>
        <div className="item flex-3 pt-8 ">
          <iframe
            width="400"
            height="309"
            src="https://www.youtube.com/embed/1UPMFwN21qo"
     
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Video;
