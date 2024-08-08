import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const StockChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data available.</p>;
  }

  const chartData = {
    labels: data.map(entry => new Date(entry.timestamp * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map(entry => parseFloat(entry.close.toFixed(2))),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const date = context.label;
            const price = context.raw;
            return `Date: ${date}, Price: ${price}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default StockChart;
