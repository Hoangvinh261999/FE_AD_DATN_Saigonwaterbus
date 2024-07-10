import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../common/headerSlice';

const InvoiceTable = () => {
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: 'Hóa đơn' }));
        fetchInvoices(new Date().toISOString().split('T')[0]);

        const interval = setInterval(() => {
            fetchInvoices(new Date().toISOString().split('T')[0]); // Gọi lại fetchInvoices sau mỗi 5 phút
        }, 5 * 60 * 1000); // Thời gian tính bằng miligiây: 5 phút

        return () => clearInterval(interval);
    }, [dispatch]);

    const token = localStorage.getItem('token');

    const fetchInvoices = async (today) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/invoices/${today}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSearchResults(response.data.result.content);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            setLoading(false);
        }
    };

    const handleRowClick = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleCloseModal = () => {
        setSelectedInvoice(null);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/invoices/${searchDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSearchResults(response.data.result.content);
        } catch (error) {
            console.error('Error searching invoices:', error);
            setSearchResults([]);
        }
        setSearchDate(''); // Làm trống input date sau khi tìm kiếm
    };

    const handleChangeDate = (event) => {
        setSearchDate(event.target.value);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center mb-4">
                <input
                    type="date"
                    className="form-input rounded-l-lg py-2 px-4 w-full md:w-72"
                    value={searchDate}
                    onChange={handleChangeDate}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg ml-2" onClick={handleSearch}>
                    Tìm kiếm
                </button>
            </div>
            {loading ? (
                <p className="text-center my-8">Đang tải...</p>
            ) : (
                <div className="overflow-x-auto">
                    <div className="w-full lg:w-5/6 bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
                            <h1 className="text-2xl font-semibold">Bảng Hóa Đơn</h1>
                        </div>
                        {searchResults.length === 0 ? (
                            <p className="p-4 text-center">Không có hóa đơn nào được tìm thấy cho ngày này.</p>
                        ) : (
                            <table className="w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                                    <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã Thanh Toán</th>
                                    <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Tạo</th>
                                    <th className="py-2 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                {searchResults.map((invoice, index) => (
                                    <tr key={invoice.id} onClick={() => handleRowClick(invoice)} className="hover:bg-gray-50 cursor-pointer transition-colors">
                                        <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{invoice.id}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{invoice.createAt}</td>
                                        <td className="py-4 px-6 whitespace-nowrap">{invoice.totalAmount}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
            {selectedInvoice && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Chi Tiết Hóa Đơn</h2>
                        <p><strong>ID:</strong> {selectedInvoice.id}</p>
                        <p><strong>Ngày Tạo:</strong> {selectedInvoice.createAt}</p>
                        <p><strong>Ngày Cập Nhật:</strong> {selectedInvoice.updateAt ? selectedInvoice.updateAt : 'N/A'}</p>
                        <p><strong>Ngày Xóa:</strong> {selectedInvoice.deleteAt ? selectedInvoice.deleteAt : 'N/A'}</p>
                        <p><strong>Tổng tiền:</strong> {selectedInvoice.totalAmount ? selectedInvoice.totalAmount : 'N/A'}</p>
                        <button onClick={handleCloseModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;
