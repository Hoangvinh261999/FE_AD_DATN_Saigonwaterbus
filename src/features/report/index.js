import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "../../utils/formatDate";
import { saveAs } from 'file-saver';

const Report = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [endpoint, setEndpoint] = useState('http://localhost:8080/api/saigonwaterbus/admin/invoice/getlistdoanhthutheongay');
    const [buttonLabel, setButtonLabel] = useState('Xuất file Excel theo ngày');
    const [currentPeriod, setCurrentPeriod] = useState('day');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.result);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, [endpoint, token]);

    const handleButtonClick = (newEndpoint, label, period) => {
        setEndpoint(newEndpoint);
        setButtonLabel(label);
        setCurrentPeriod(period);
    };

    const handleExportClick = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8080/api/saigonwaterbus/admin/invoice/export?period=${currentPeriod}`,
                method: 'GET',
                responseType: 'blob', // This is important
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `invoices_${currentPeriod}.xlsx`);
        } catch (error) {
            console.error("Error exporting data: ", error);
        }
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const calculateTotalAmount = () => {
        return data.reduce((total, invoice) => total + invoice.totalAmount, 0);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-row justify-center gap-2 pt-3 pb-3">
                <button
                    className="btn btn-primary font-bold text-lg text-white"
                    onClick={() => handleButtonClick('http://localhost:8080/api/saigonwaterbus/admin/invoice/getlistdoanhthutheongay', 'Xuất file Excel theo ngày', 'day')}
                >
                    Doanh thu theo ngày
                </button>
                <button
                    className="btn btn-primary font-bold text-lg text-white"
                    onClick={() => handleButtonClick('http://localhost:8080/api/saigonwaterbus/admin/invoice/getlistdoanhthutheotuan', 'Xuất file Excel theo tuần', 'week')}
                >
                    Doanh thu theo tuần
                </button>
                <button
                    className="btn btn-primary font-bold text-lg text-white"
                    onClick={() => handleButtonClick('http://localhost:8080/api/saigonwaterbus/admin/invoice/getlistdoanhthutheothang', 'Xuất file Excel theo tháng', 'month')}
                >
                    Doanh thu theo tháng
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-6">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Thành tiền</th>
                        <th className="px-4 py-2 border">Phương thức thanh toán</th>
                        <th className="px-4 py-2 border">Ngày tạo</th>
                    </tr>
                    </thead>
                </table>
                <div className="overflow-y-auto h-[500px]">
                    <table className="table-auto w-full">
                        <tbody>
                        {data.map((invoice, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                <td className="px-4 py-2 border">{formatCurrency(invoice.totalAmount)}</td>
                                <td className="px-4 py-2 border">{invoice.payMethod}</td>
                                <td className="px-4 py-2 border">{formatDate(invoice.createAt)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-gray-200 p-2">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-lg font-bold">{formatCurrency(calculateTotalAmount())}</span>
                    <button
                        className="btn btn-warning font-bold text-lg"
                        onClick={handleExportClick}
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Report;