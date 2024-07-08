import React, { useState, useEffect } from 'react';

const data = [
    {
        id: 45,
        payMethod: "BANK_TRANSFER",
        totalAmount: 30000.0,
        status: "COMPLETED",
        createAt: "2024-06-17",
        updateAt: null,
        deleteAt: null
    },
    {
        id: 50,
        payMethod: "BANK_TRANSFER",
        totalAmount: 15000.0,
        status: "COMPLETED",
        createAt: "2024-06-17",
        updateAt: null,
        deleteAt: null
    }
];

const getPayMethod = (method) => {
    if (method === "BANK_TRANSFER") {
        return "Chuyển khoản";
    }
    return "Tiền mặt";
};

const getStatus = (status) => {
    switch (status) {
        case "COMPLETED":
            return "Thành công";
        case "PENDING":
            return "Đang chờ";
        case "FAIL":
            return "Thất bại";
        default:
            return status;
    }
};

const InvoiceTable = () => {
    const [loading, setLoading] = useState(true);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading for 2 seconds
    }, []);

    const handleRowClick = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleCloseModal = () => {
        setSelectedInvoice(null);
    };


    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <div className="min-w-screen min-h-screenflex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full lg:w-5/6">
                        <div className="bg-white shadow-md rounded my-6">
                            <div className="px-5 py-4 border-b border-gray-200 bg-gray-100">
                                <h1 className="text-2xl font-semibold">Bảng Hóa Đơn</h1>
                            </div>
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">STT</th>
                                        <th className="py-3 px-6 text-left">Mã Thanh Toán</th>
                                        <th className="py-3 px-6 text-left">Phương Thức Thanh Toán</th>
                                        <th className="py-3 px-6 text-left">Tổng Số Tiền</th>
                                        <th className="py-3 px-6 text-left">Trạng Thái</th>
                                        <th className="py-3 px-6 text-left">Ngày Tạo</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {data.map((invoice, index) => (
                                        <tr key={invoice.id} onClick={() => handleRowClick(invoice)} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                                            <td className="py-3 px-6 text-left">{index + 1}</td>
                                            <td className="py-3 px-6 text-left">{invoice.id}</td>
                                            <td className="py-3 px-6 text-left">{getPayMethod(invoice.payMethod)}</td>
                                            <td className="py-3 px-6 text-left">{invoice.totalAmount}</td>
                                            <td className="py-3 px-6 text-left">{getStatus(invoice.status)}</td>
                                            <td className="py-3 px-6 text-left">{invoice.createAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedInvoice && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseModal}>
                    <div className="bg-white rounded-lg p-6 w-1/2" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-4">Chi Tiết Hóa Đơn</h2>
                        <p><strong>ID:</strong> {selectedInvoice.id}</p>
                        <p><strong>Phương Thức Thanh Toán:</strong> {selectedInvoice.payMethod === "BANK_TRANSFER" ? "Chuyển khoản" : "Tiền mặt"}</p>
                        <p><strong>Tổng Số Tiền:</strong> {selectedInvoice.totalAmount}</p>
                        <p><strong>Trạng Thái:</strong> {selectedInvoice.status === "COMPLETED" ? "Thành công" : selectedInvoice.status === "PENDING" ? "Đang chờ" : "Thất bại"}</p>
                        <p><strong>Ngày Tạo:</strong> {selectedInvoice.createAt}</p>
                        <p><strong>Ngày Cập Nhật:</strong> {selectedInvoice.updateAt ? selectedInvoice.updateAt : "N/A"}</p>
                        <p><strong>Ngày Xóa:</strong> {selectedInvoice.deleteAt ? selectedInvoice.deleteAt : "N/A"}</p>
                        <button onClick={handleCloseModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;
