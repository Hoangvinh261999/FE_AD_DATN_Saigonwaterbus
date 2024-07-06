import React from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets, updateTicket, deleteTicket }) => {
    return (
        <table className="min-w-full bg-white border">
            <thead>
            <tr>
                <th className="border p-2">STT</th>
                <th className="border p-2">ID tàu</th>
                <th className="border p-2">Trạng thái</th>
                <th className="border p-2">Giá thành</th>
                <th className="border p-2">Ngày tạo</th>
                <th className="border p-2">Hành động</th>
            </tr>
            </thead>
            <tbody className='tbodyTicket'>
            {tickets.map(ticket => (
                <TicketItem
                    key={ticket.id}
                    ticket={ticket}
                    updateTicket={updateTicket}
                    deleteTicket={deleteTicket}
                />
            ))}
            </tbody>
        </table>
    );
};

export default TicketList;
