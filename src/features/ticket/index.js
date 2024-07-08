import React, { useState } from 'react';
import TicketList from './/component/TicketList';

const generateTickets = (num) => {
    const tickets = [];
    for (let i = 1; i <= num; i++) {
        const trainId = ['A123', 'B456', 'C789'][Math.floor(Math.random() * 3)];
        const status = ['Booked', 'Cancelled', 'Pending'][Math.floor(Math.random() * 3)];
        const price = Math.floor(Math.random() * 100) + 50;
        const dateCreated = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0];
        tickets.push({ id: i.toString(), trainId, status, price, dateCreated });
    }
    return tickets;
};

const initialTickets = generateTickets(1000);

const TicketManagement = () => {
    const [tickets, setTickets] = useState(initialTickets);
    const [searchTrainId, setSearchTrainId] = useState('');
    const [searchMonth, setSearchMonth] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ticketsPerPage = 6;

    const updateTicket = (updatedTicket) => {
        setTickets(tickets.map(ticket => ticket.id === updatedTicket.id ? updatedTicket : ticket));
    };

    const deleteTicket = (id) => {
        setTickets(tickets.filter(ticket => ticket.id !== id));
    };

    const handleSearchTrainIdChange = (e) => {
        setSearchTrainId(e.target.value);
    };

    const handleSearchMonthChange = (e) => {
        setSearchMonth(e.target.value);
    };

    const handleSearchYearChange = (e) => {
        setSearchYear(e.target.value);
    };

    const filteredTickets = tickets.filter(ticket => {
        const ticketDate = new Date(ticket.dateCreated);
        const ticketMonth = (ticketDate.getMonth() + 1).toString().padStart(2, '0');
        const ticketYear = ticketDate.getFullYear().toString();

        return (!searchTrainId || ticket.trainId === searchTrainId) &&
            (!searchMonth || ticketMonth === searchMonth) &&
            (!searchYear || ticketYear === searchYear);
    });

    const uniqueTrainIds = [...new Set(tickets.map(ticket => ticket.trainId))];
    const uniqueMonths = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const uniqueYears = [...new Set(tickets.map(ticket => new Date(ticket.dateCreated).getFullYear()))];

    const indexOfLastTicket = currentPage * ticketsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const totalPageNumbers = Math.ceil(filteredTickets.length / ticketsPerPage);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPageNumbers ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPageNumbers);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý vé tàu</h1>
            <div className="mb-4 flex justify-between items-center space-x-4">
                <div>
                    <label htmlFor="searchTrainId" className="mr-2">Tìm kiếm theo ID tàu:</label>
                    <select id="searchTrainId" value={searchTrainId} onChange={handleSearchTrainIdChange} className="p-2 border rounded">
                        <option value="">Tất cả</option>
                        {uniqueTrainIds.map(trainId => (
                            <option key={trainId} value={trainId}>{trainId}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="searchMonth" className="mr-2">Chọn tháng:</label>
                    <select id="searchMonth" value={searchMonth} onChange={handleSearchMonthChange} className="p-2 border rounded">
                        <option value="">Tất cả</option>
                        {uniqueMonths.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="searchYear" className="mr-2">Chọn năm:</label>
                    <select id="searchYear" value={searchYear} onChange={handleSearchYearChange} className="p-2 border rounded">
                        <option value="">Tất cả</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>
            <TicketList tickets={currentTickets} updateTicket={updateTicket} deleteTicket={deleteTicket} />
                    <div className="mt-4 flex justify-center">
                        <button onClick={handleFirstPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
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
                                    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                                    </svg>
                        </button>
                        <button onClick={handlePrevPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
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
                                    <path d="M15 18l-6-6 6-6" />
                                    </svg>
                        </button>
                        <button onClick={handleNextPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
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
                                    <path d="M9 18l6-6-6-6" />
                                    </svg>
                        </button>
                        <button onClick={handleLastPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
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
                                    <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                                    </svg>
                        </button>
                    </div>
        </div>
    );
};

export default TicketManagement;
