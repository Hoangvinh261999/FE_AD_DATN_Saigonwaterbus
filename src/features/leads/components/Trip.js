import React from 'react';
function TripList({ trips }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-bold mb-4">Danh Sách Các Chuyến Tàu</h3>
            {trips.length === 0 ? (
                <p className="text-gray-700">Không có chuyến tàu nào.</p>
            ) : (
                <table className="hover:table-fixed">
                    <thead>
                    <tr>
                        <th className="border-b p-2">Giờ khởi hành</th>
                        <th className="border-b p-2">Số ghế khả dụng</th>
                        <th className="border-b p-2">Ngày khởi hành</th>
                        <th className="border-b p-2">Giờ đến</th>
                        <th className="border-b p-2">Tuyến tàu</th>
                        <th className="border-b p-2">Tàu</th>
                        <th className="border-b p-2">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td className="border-b p-2">{trip.departureTime}</td>
                            <td className="border-b p-2">{trip.availableSeats}</td>
                            <td className="border-b p-2">{trip.departureDate}</td>
                            <td className="border-b p-2">{trip.arrivalTime}</td>
                            <td className="border-b p-2">{trip.route}</td>
                            <td className="border-b p-2">{trip.ship}</td>
                            <td className="border-b p-2">
                                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="">Sửa</a>
                                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' href="">Xóa</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// Dữ liệu chuyến tàu
const trips = [
    {
        departureTime: '08:00 AM',
        availableSeats: 20,
        departureDate: '2024-06-11',
        arrivalTime: '12:00 PM',
        route: 'Hà Nội - Hải Phòng',
        ship: 'Tàu SE1',
    },
    {
        departureTime: '09:30 AM',
        availableSeats: 15,
        departureDate: '2024-06-11',
        arrivalTime: '01:30 PM',
        route: 'Hà Nội - Sài Gòn',
        ship: 'Tàu SE3',
    },
    {
        departureTime: '02:00 PM',
        availableSeats: 30,
        departureDate: '2024-06-12',
        arrivalTime: '06:00 PM',
        route: 'Đà Nẵng - Nha Trang',
        ship: 'Tàu SE5',
    },
];

export default function App() {
    return <TripList trips={trips} />;
}
