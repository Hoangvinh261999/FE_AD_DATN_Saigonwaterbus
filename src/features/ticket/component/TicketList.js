import React, { useState } from 'react';
import axios from 'axios';

const TicketList = ({ tickets, date, setDate, page, setPage, size, totalPages, fetchTickets }) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleRowClick = async (ticketId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/tickets/${ticketId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedTicket(response.data.result);
            setIsPopupOpen(true);
        } catch (error) {
            console.error('Error fetching ticket details:', error);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedTicket(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Danh sách vé </h1>
            <div className="mb-4">
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 px-2 py-1 mr-2"
                />
                <button onClick={fetchTickets} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Tìm Kiếm</button>
            </div>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                <tr>
                    <th className="border border-gray-300 px-4 py-2">STT</th>
                    <th className="border border-gray-300 px-4 py-2">Ngày Khởi Hành</th>
                    <th className="border border-gray-300 px-4 py-2">Giá vé</th>
                    <th className="border border-gray-300 px-4 py-2">Trạng thái vé</th>
                    <th className="border border-gray-300 px-4 py-2">Ngày tạo vé</th>
                </tr>
                </thead>
                <tbody>
                {tickets.map((ticket,index) => (
                    <tr key={ticket.id} onClick={() => handleRowClick(ticket.id)} className="cursor-pointer hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                        <td className="border border-gray-300 px-4 py-2">{ticket.departureDate}</td>
                        <td className="border border-gray-300 px-4 py-2">{ticket.price}</td>
                        <td className="border border-gray-300 px-4 py-2">{ticket.status}</td>
                        <td className="border border-gray-300 px-4 py-2">{ticket.createAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="mt-4">
                <button onClick={() => setPage(page - 1)} disabled={page === 0}
                        className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                    >
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPages}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                    >
                    <path d="M9 18l6-6-6-6"/>
                </svg></button>
            </div>

            {/* Popup for displaying ticket details */}
            {isPopupOpen && selectedTicket && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg max-w-md">
                        <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
                        <p><strong>ID:</strong> {selectedTicket.id}</p>
                        <p><strong>Departure Date:</strong> {selectedTicket.departureDate}</p>
                        <p><strong>Price:</strong> {selectedTicket.price}</p>
                        <p><strong>Status:</strong> {selectedTicket.status}</p>
                        <p><strong>Create At:</strong> {selectedTicket.createAt}</p>
                        {/* Example of displaying additional details */}
                        {selectedTicket.seatName && <p><strong>Seat Name:</strong> {selectedTicket.seatName}</p>}
                        {selectedTicket.tripName && <p><strong>Trip Name:</strong> {selectedTicket.tripName}</p>}
                        {selectedTicket.invoiceId && <p><strong>Invoice ID:</strong> {selectedTicket.invoiceId}</p>}
                        <button onClick={closePopup} className="bg-blue-500 text-white px-4 py-1 rounded mt-4 hover:bg-blue-600">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketList;
