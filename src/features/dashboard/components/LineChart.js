import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function LineChart() {
  const token = localStorage.getItem("token");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        fill: true,
        label: 'Doanh số',
        data: [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/saigonwaterbus/admin/invoice/getdoanhthu',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
        .then(response => {
          console.log(response.data);
          const result = response.data.result;

          const labels = result.map(item => {
            const monthNames = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];
            return monthNames[item.month - 1];
          });

          const data = result.map(item => item.totalAmountByMonth / 100000); // Chia cho 100000 để có đơn vị 100,000đ

          setChartData({
            labels: labels,
            datasets: [
              {
                ...chartData.datasets[0],
                data: data,
              },
            ],
          });
        })
        .catch(error => console.error('Error fetching data:', error));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '00,000đ';
          }
        }
      },
      x: {
        type: 'category',
        labels: chartData.labels,
      }
    },
  };

  return (
      <div>
        <Line data={chartData} options={options} />
        <div className="text-center font-black mt-5">Doanh số bán vé theo tháng</div>
      </div>
  );
}

export default LineChart;