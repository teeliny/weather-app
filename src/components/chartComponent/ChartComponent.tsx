import React from 'react';
import {
  Chart as BarChart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { convertTemp, timeFormats } from '../../utils/formatter/basicFormatter';
import { IChartInput } from './chart.typing';


BarChart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

function ChartComponent({ input, tempUnit }: IChartInput) {
  const currentDate = input[0].current_date;
  const barData = [];
  const barLabel = [];
  for (let index = 0; index < input.length; index++) {
    const { temp, hour } = input[index];
    const hourString: string = hour.toString();
    barData.push((convertTemp(tempUnit, temp)).toFixed(2));
    barLabel.push(timeFormats[hourString]);
  }
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          color: '#4eeb9c',
          tickColor: '#0055ff',
        },
        ticks: {
          color: '#0055ff',
        },
      },
      y: {
        grid: {
          color: '#4eeb9c',
          tickColor: '#0055ff',
        },
        ticks: {
          color: '#0055ff',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Chart for ${currentDate} in ${tempUnit === '0' ? 'C' : 'F'}`,
        color: '#0055ff',
      },
    },
  };
  const data = {
    labels: barLabel,
    datasets: [
      {
        data: barData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  }; 
  return (
    <React.Fragment>
      <Bar
        options={options}
        data={data}
        height={280}
      />
    </React.Fragment>
  )
}

export default ChartComponent;

