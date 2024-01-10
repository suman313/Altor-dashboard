import React from "react";
import {dataset} from "../Charts/chartData"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  Utils
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' ,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' ,
      display: true,
      position: 'left' ,
    },
    y1: {
      type: 'linear' ,
      display: true,
      position: 'right' ,
      grid: {
        drawOnChartArea: false,
      },
    },
    y2: {
      type: 'linear' ,
      display: true,
      position: 'right' ,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

let labels_len = dataset[0].data.length
let current_time = Date.now();
const labels = [0]

for (let i = 0; i < labels_len; i++) {
  
  labels.push(i)
}

console.log(Date(current_time).split(' ')[4], labels);



export const data = {
  labels: labels,
  datasets: dataset
};

export const Chart = () => {
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};
