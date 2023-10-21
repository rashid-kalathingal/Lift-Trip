import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { LinearScale, CategoryScale } from 'chart.js'; // Import the necessary scales
import Chart from 'chart.js/auto'; // Import Chart.js
import { adminInstance } from '../../../utils/axiosApi';

// Register the scales globally
LinearScale.id = 'linear';
CategoryScale.id = 'category';
Chart.register(LinearScale, CategoryScale);

const BarChart = () => {
  const [rides, setrides] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const response = await adminInstance.get('/getTotRides');
        console.log(response.data, 'pppppp');
        setrides(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWallet();
  }, []);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Create an array to hold the data points for each month
  const dataPoints = months.map((month, index) => {
    const monthData = rides.find((ride) => ride._id - 1 === index); // Subtract 1 here
    return monthData ? monthData.count : 0;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Rides in Every Month',
        data: dataPoints,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
