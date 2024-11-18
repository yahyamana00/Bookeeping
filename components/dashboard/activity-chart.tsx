"use client";

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const data = {
  labels: ['1', '5', '10', '15', '20', '25', '30'],
  datasets: [
    {
      fill: true,
      label: 'Activity',
      data: [65, 78, 66, 44, 56, 67, 75],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: '#9CA3AF',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#9CA3AF',
      },
    },
  },
};

export function ActivityChart() {
  return (
    <div className="p-4 rounded-2xl bg-neutral-800/50">
      <h3 className="text-sm font-medium mb-4">Activity Graph</h3>
      <div className="h-40">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}