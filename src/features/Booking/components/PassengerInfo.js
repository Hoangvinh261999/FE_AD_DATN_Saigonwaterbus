import React from 'react';

const PassengerInfo = ({ passengerInfo, onChange }) => {
    const handleChange = (e) => {
        const newPassengerInfo = {
            ...passengerInfo,
            [e.target.name]: e.target.value,
        };
        onChange({ passengerInfo: newPassengerInfo });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Thông tin người đặt</h2>
            <h5 className="text-sm font-bold">Họ Và Tên</h5>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={passengerInfo.name}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <h5 className="text-sm font-bold">Email</h5>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={passengerInfo.email}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <h5 className="text-sm font-bold">Số Điện Thoại</h5>
            <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={passengerInfo.phone}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
            />
            <h5 className="text-sm font-bold">Ghi Chú</h5>
            <textarea
                name="note"
                placeholder="Note"
                value={passengerInfo.note}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
        </div>
    );
};

export default PassengerInfo;
