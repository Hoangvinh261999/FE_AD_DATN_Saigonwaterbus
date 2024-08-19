import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, formatDate } from "../../utils/formatDate";
import { saveAs } from 'file-saver';

const Report = () => {
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (startDate > endDate) {
            setError("Ngày bắt đầu không thể lớn hơn ngày kết thúc.");
            return;
        }

        setError("");

        try {
            const formattedStartDate = format(startDate);
            const formattedEndDate = format(endDate);

            const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/invoice/getlistdoanhthu', {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setData(response.data.result);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError("Có lỗi xảy ra khi lấy dữ liệu.");
        }
    };

    const handleExportClick = async () => {
        try {
            const response = await axios({
                url: `http://localhost:8080/api/saigonwaterbus/admin/invoice/export`,
                method: 'GET',
                responseType: 'blob',
                params: {
                    startDate: format(startDate),
                    endDate: format(endDate)
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `invoices_${format(startDate)}_${format(endDate)}.xlsx`);
        } catch (error) {
            console.error("Error exporting data: ", error);
        }
    }

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const calculateTotalAmount = () => {
        return data.reduce((total, invoice) => total + invoice.totalAmount, 0);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="text-lg font-medium mb-1">Chọn ngày bắt đầu</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Chọn ngày bắt đầu"
                            dateFormat="yyyy-MM-dd"
                            className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="endDate" className="text-lg font-medium mb-1">Chọn ngày kết thúc</label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            placeholderText="Chọn ngày kết thúc"
                            dateFormat="yyyy-MM-dd"
                            className="border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <button
                    className="btn btn-primary mt-4 sm:mt-0 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </button>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="overflow-x-auto">
                <table className="table-auto w-full mt-6 border-separate border-spacing-0">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">Thành tiền</th>
                        <th className="px-4 py-2 border">Phương thức thanh toán</th>
                        <th className="px-4 py-2 border">Ngày tạo</th>
                    </tr>
                    </thead>
                </table>
                <div className="overflow-y-auto h-[400px]">
                    <table className="table-auto w-full mt-2 border-separate border-spacing-0">
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
            <div className="bg-gray-200 p-4 mt-6 rounded-md">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-lg font-bold">{formatCurrency(calculateTotalAmount())}</span>
                    <button
                        className="btn btn-warning px-6 py-2 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        onClick={handleExportClick}
                    >
                        Xuất file Excel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Report;