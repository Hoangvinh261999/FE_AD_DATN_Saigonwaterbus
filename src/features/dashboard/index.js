import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AmountStats from "./components/AmountStats";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";

const Dashboard = () => {
    const token = localStorage.getItem("token");
    const [totalAmountByDay, setTotalAmountByDay] = useState(0);
    const [totalTicketByDay, setTotalTicketByDay] = useState(0);
    const [allCustomer, setAllCustomer] = useState(0);

    useEffect(() => {
        const fetchTotalAmountByDay = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/invoice/getdoanhthutheongay', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                    setTotalAmountByDay(response.data.result.totalAmountByDay);
                }
            } catch (error) {
                console.error('Error fetching total amount by day:', error);
            }
        };

        const fetchTotalTicketByDay = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/ticket/getallticketbyday', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                    setTotalTicketByDay(response.data.result.totalTicket);
                }
            } catch (error) {
                console.error('Error fetching total ticket by day:', error);
            }
        }

        const fetchCountAllCustomer = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/ticket/countallcustomer', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                    setAllCustomer(response.data.result.totalTicket);
                }
            } catch (error) {
                console.error('Error fetching total ticket by day:', error);
            }
        }

        fetchTotalAmountByDay();
        fetchTotalTicketByDay();
        fetchCountAllCustomer();
    }, []);

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    return (
        <div className="bg-white">
            <div className="grid grid-cols-3 m-0">
                <AmountStats title="Tổng số lượt khách" amount={allCustomer}/>
                <AmountStats title="Tổng vé trong ngày" amount={totalTicketByDay}/>
                <AmountStats title="Tổng doanh thu trong ngày" amount={formatCurrency(totalAmountByDay)}/>
            </div>

            <div className="m-5 grid grid-cols-3">
                <div className="col-span-2 w-[850px] h-[700px]">
                    <LineChart/>
                </div>
                <DoughnutChart/>
            </div>
        </div>
    );
}

export default Dashboard;
