import React, { useState, useEffect } from 'react';
import './bill.css';

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
        }, 2000); // Giả lập loading trong 2 giây
    }, []);

    const handleRowClick = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const handleCloseModal = () => {
        setSelectedInvoice(null);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="App">
            <div className="invoice-table-container">
                <div className="invoice-table-wrapper">
                    <div className="table-header">
                        <h1>Bảng Hóa Đơn</h1>
                    </div>
                    <table className="invoice-table">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Thanh Toán</th>
                            <th>Phương Thức Thanh Toán</th>
                            <th>Tổng Số Tiền</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Tạo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((invoice, index) => (
                            <tr key={invoice.id} onClick={() => handleRowClick(invoice)} className="cursor-pointer">
                                <td>{index + 1}</td>
                                <td>{invoice.id}</td>
                                <td>{getPayMethod(invoice.payMethod)}</td>
                                <td>{invoice.totalAmount}</td>
                                <td>{getStatus(invoice.status)}</td>
                                <td>{invoice.createAt}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {selectedInvoice && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Chi Tiết Hóa Đơn</h2>
                        <p><strong>ID:</strong> {selectedInvoice.id}</p>
                        <p><strong>Phương Thức Thanh Toán:</strong> {selectedInvoice.payMethod === "BANK_TRANSFER" ? "Chuyển khoản" : "Tiền mặt"}</p>
                        <p><strong>Tổng Số Tiền:</strong> {selectedInvoice.totalAmount}</p>
                        <p><strong>Trạng Thái:</strong> {selectedInvoice.status === "COMPLETED" ? "Thành công" : selectedInvoice.status === "PENDING" ? "Đang chờ" : "Thất bại"}</p>
                        <p><strong>Ngày Tạo:</strong> {selectedInvoice.createAt}</p>
                        <p><strong>Ngày Cập Nhật:</strong> {selectedInvoice.updateAt ? selectedInvoice.updateAt : "N/A"}</p>
                        <p><strong>Ngày Xóa:</strong> {selectedInvoice.deleteAt ? selectedInvoice.deleteAt : "N/A"}</p>
                        <button onClick={handleCloseModal} className="modal-close-button">Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceTable;
