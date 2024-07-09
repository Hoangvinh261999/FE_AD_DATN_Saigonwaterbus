import React, { useEffect, useState } from "react";
import axios from "axios";

function TripList({ trip }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [stations, setStations] = useState([]);
    const token = localStorage.getItem("token");
    const [ships, setShips] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        departureDate: "",
        departureTime: "",
        arrivalTime: "",
        availableSeats: "",
        route: {
            id: "",
            nameRoute: "",
            fromTerminal: { name: "" },
            toTerminal: { name: "" }
        },
        status: "",
        ship: {
            id: "",
            name: "",
            type: "",
            capacity: "",
            status: "",
            // Add other relevant fields here
        }
    });

    const openDetail = (item) => {
        setSelectedItem(item);
        setFormData(item);
    };

    const closeDetail = () => {
        setSelectedItem(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRouteChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            route: {
                ...prevData.route,
                [name]: value,
            },
        }));
    };

    const handleShipChange = (e) => {
        const selectedShipId = e.target.value;
        const selectedShip = ships.find(ship => ship.id === parseInt(selectedShipId));
        setFormData((prevData) => ({
            ...prevData,
            ship: selectedShip ? { ...selectedShip } : {
                id: "",
                name: "",
                type: "",
                capacity: "",
                status: "",
                // Reset other relevant fields here
            },
        }));
    };

    const handleUpdateTrip = async () => {
        try {
            console.log("Form data being sent:", formData);
            const response = await axios.put("http://localhost:8080/api/saigonwaterbus/admin/trip/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Update successful", response.data);
            window.alert("Cập nhật thành công")
            closeDetail();
        } catch (error) {
            window.alert("Cập nhật thất bại")
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else {
                console.error("Error updating trip:", error);
            }
        }
    };

    const handleDeleteTrip = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/trip/delete/${formData.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Delete successful", response.data);
            alert("Xóa chuyến tàu thành công");
            closeDetail();
        } catch (error) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
                console.error("Error response headers:", error.response.headers);
            } else {
                console.error("Error deleting trip:", error);
            }
            alert("Xóa chuyến tàu thất bại");
        }
    };

    const getShips = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/saigonwaterbus/admin/ship", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShips(response.data.result);
        } catch (error) {
            console.error("Error fetching ships:", error);
        }
    };

    const getStations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/saigonwaterbus/admin/station", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStations(response.data.result);
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    };

    useEffect(() => {
        getShips();
        getStations();
    }, []);

    const getStatus = (status) => {
        return status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động";
    };

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
                    <div className="bg-white rounded-lg p-8 w-auto">
                        <h2 className="text-xl font-semibold mb-4">Thông tin chi tiết</h2>
                        <form className="grid grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">ID</label>
                                <input
                                    type="text"
                                    name="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Ngày khởi hành</label>
                                <input
                                    type="date"
                                    name="departureDate"
                                    value={formData.departureDate}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Thời gian khởi hành</label>
                                <input
                                    type="time"
                                    name="departureTime"
                                    value={formData.departureTime}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Thời gian đến</label>
                                <input
                                    type="time"
                                    name="arrivalTime"
                                    value={formData.arrivalTime}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Số ghế trống</label>
                                <input
                                    type="number"
                                    name="availableSeats"
                                    value={formData.availableSeats}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Tuyến đường</label>
                                <input
                                    type="text"
                                    name="nameRoute"
                                    value={formData.route.nameRoute}
                                    onChange={handleRouteChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Ga đi</label>
                                <input
                                    type="text"
                                    name="fromTerminal"
                                    value={formData.route.fromTerminal.name}
                                    onChange={handleRouteChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Ga đến</label>
                                <input
                                    type="text"
                                    name="toTerminal"
                                    value={formData.route.toTerminal.name}
                                    onChange={handleRouteChange}
                                    className="mt-1 p-2 w-full border rounded"
                                />
                            </div>
                            <div className="mb-4 col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded"
                                >
                                    <option value="ACTIVE">Đang hoạt động</option>
                                    <option value="INACTIVE">Không hoạt động</option>
                                </select>
                            </div>
                            <div className="mb-4 col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Tàu</label>
                                <select
                                    name="ship"
                                    onChange={handleShipChange}
                                    className="mt-1 p-2 w-full border rounded"
                                >
                                    <option value="">Chọn tàu</option>
                                    {ships.map((ship) => (
                                        <option key={ship.id} value={ship.id}>{ship.id}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdateTrip}>Chỉnh sửa</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteTrip}>Xóa</button>
                            <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={closeDetail}>Đóng</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TripList;
