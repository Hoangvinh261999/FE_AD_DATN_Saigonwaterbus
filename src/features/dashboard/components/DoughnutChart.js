import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Chart as ChartJS,
    Filler,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Filler, Title, Legend);

function DoughnutChart() {
    const token = localStorage.getItem("token");
    const [chartData, setChartData] = useState({
        labels: ["Tiền mặt", "Chuyển khoản"],
        datasets: [
            {
                label: 'Tỉ lệ loại thanh toán',
                data: [0, 0],
                backgroundColor: [
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                ],
                borderWidth: 1,
            }
        ],
    });

    useEffect(() => {
        axios.get('http://localhost:8080/api/saigonwaterbus/admin/invoice/paymethod', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const result = response.data.result || [];

                // Xử lý dữ liệu
                const labels = result.map(item =>
                    item.payMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'
                );

                const percentages = result.map(item => item.percentage || 0); // Default to 0 if percentage is missing

                const updatedData = {
                    labels: labels,
                    datasets: [
                        {
                            ...chartData.datasets[0],
                            data: percentages,
                        }
                    ],
                };

                setChartData(updatedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Tỉ lệ loại thanh toán',
            },
        },
    };

    return (
        <div>
            <Doughnut options={options} data={chartData} />
            <div className="text-center font-black mt-5">Tỉ lệ loại thanh toán (%)</div>
        </div>
    );
}

export default DoughnutChart;