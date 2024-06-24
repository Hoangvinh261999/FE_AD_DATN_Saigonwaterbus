import React from 'react';

const Summary = ({ selectedSeats, passengerInfo }) => {
    const totalPrice = selectedSeats.length * 15000; // assuming each seat costs 100

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ghế đã đặt</h2>
            <p>Seats: {selectedSeats.join(', ')}</p>
            <p>Total Price: {totalPrice}VNĐ</p>
            <h3 className="text-xl font-bold">Thông tin người đặt</h3>
            <p>Name: {passengerInfo.name}</p>
            <p>Email: {passengerInfo.email}</p>
            <p>Phone: {passengerInfo.phone}</p>
            <p>Note: {passengerInfo.note}</p>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => alert('Proceeding to Payment')}
            >
                Proceed to Payment
            </button>
        </div>
    );
};

export default Summary;
