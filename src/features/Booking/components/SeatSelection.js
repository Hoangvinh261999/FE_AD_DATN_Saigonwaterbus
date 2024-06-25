import React, { useState } from 'react';

const SeatSelection = ({ onChange }) => {
    const seats = Array.from({ length: 60 }, (_, index) => ({
        id: index + 1,
        label: `${Math.floor(index / 6) + 1}${String.fromCharCode(65 + (index % 6))}`,
    }));
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleSeatSelect = (seat) => {
        const newSelectedSeats = selectedSeats.includes(seat)
            ? selectedSeats.filter(s => s !== seat)
            : [...selectedSeats, seat];
        setSelectedSeats(newSelectedSeats);
        onChange({ selectedSeats: newSelectedSeats });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Select Seat</h2>
            <div className="grid grid-cols-6 gap-2">
                {seats.map(seat => (
                    <button
                        key={seat.id}
                        className={`p-2 border border-gray-300 rounded-md ${selectedSeats.includes(seat.label) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => handleSeatSelect(seat.label)}
                    >
                        {seat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SeatSelection;
