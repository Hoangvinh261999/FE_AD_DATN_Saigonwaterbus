import React, { useState } from "react";

function TripList({ trip }) {
    const [selectedItem, setSelectedItem] = useState(null);

    const openDetail = (item) => {
        setSelectedItem(item);
    };

    const closeDetail = () => {
        setSelectedItem(null);
    };

    function getStatus(status) {
        if (status === "ACTIVE") {
            return "Đang hoạt động";
        } else {
            return "Không hoạt động";
        }
    }

    return (
        <div className="p-4 rounded-lg">
        <h2 className="font-bold text-xl">Danh sách chuyến tàu</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày khởi hành</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thời gian khởi hành</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thời gian đến</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Số ghế trống</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tuyến đường</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trạng thái</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {trip.map((item) => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => openDetail(item)}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.departureDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.departureTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.arrivalTime}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.availableSeats}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.route.nameRoute}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatus(item.status)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
                        <p><strong>ID:</strong> {selectedItem.id}</p>
                        <p><strong>Ngày khởi hành:</strong> {selectedItem.departureDate}</p>
                        <p><strong>Thời gian khởi hành:</strong> {selectedItem.departureTime}</p>
                        <p><strong>Thời gian đến:</strong> {selectedItem.arrivalTime}</p>
                        <p><strong>Số ghế trống:</strong> {selectedItem.availableSeats}</p>
                        <p><strong>Tuyến đường:</strong> {selectedItem.route.nameRoute}</p>
                        <p><strong>Ga đi:</strong> {selectedItem.route.fromTerminal.name}</p>
                        <p><strong>Ga đến:</strong> {selectedItem.route.toTerminal.name}</p>
                        <p><strong>Trạng thái:</strong> {getStatus(selectedItem.status)}</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Chỉnh sửa</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Xoá</button>
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeDetail}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TripList;
