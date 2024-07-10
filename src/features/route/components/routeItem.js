import React, { useState } from 'react';
import axios from 'axios';

const RouteItem = ({ route, onDelete, onEdit, stations ,stt}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [formData, setFormData] = useState({ ...route });
    const [selectedWaypoints, setSelectedWaypoints] = useState([]);

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleWaypointChange = (e, stationId) => {
        const { name, value, checked } = e.target;
        if (name === 'waypoint') {
            if (checked) {
                setSelectedWaypoints([...selectedWaypoints, { id: stationId, stopOrder: 1 }]);
            } else {
                setSelectedWaypoints(selectedWaypoints.filter(wp => wp.id !== stationId));
            }
        } else {
            setSelectedWaypoints(selectedWaypoints.map(wp =>
                wp.id === stationId ? { ...wp, stopOrder: value } : wp
            ));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const waypoints = selectedWaypoints.map((wp, index) => ({
            station: { id: wp.id },
            stopOrder: index + 1
        }));

        const editedRoute = {
            id: route.id,
            nameRoute: formData.name,
            fromTerminal: { id: formData.start },
            toTerminal: { id: formData.end },
            waypoints: waypoints,
            status: formData.status,
            createAt: route.createAt
        };
        console.log(editedRoute);

        const token = localStorage.getItem("token");

        try {
            // Gửi request PUT để cập nhật editedRoute xuống server
            const response = await axios.put(
                'http://localhost:8080/api/saigonwaterbus/admin/route/update',
                editedRoute,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(response.data.code===200){
                window.alert("Sửa Tuyến Thành Công")
            }else{
                window.alert("Sửa Tuyến Thất Bại")
            }
            console.log('Response from server:', response.data);


            // Đóng popup
            closePopup();
        } catch (error) {
            console.error('Error saving route:', error);
            // Xử lý lỗi nếu cần thiết
        }
    };
    const getStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return "Kích hoạt";
            case "INACTIVE":
                return "Chưa kích hoạt";
            case "DELETE":
                return "Đã xóa";
            default:
                return status;
        }
    };
    return (
        <tr>
            <td className="border px-4 py-2">{stt+1}</td>
            <td className="border px-4 py-2">{route.start}</td>
            <td className="border px-4 py-2">{route.stops}</td>
            <td className="border px-4 py-2">{route.end}</td>
            <td className="border px-4 py-2">{route.name}</td>
            <td className="border px-4 py-2">{getStatus(route.status)}</td>
            <td className="border px-4 py-2">
                <button onClick={openPopup} className="px-2 py-1 bg-yellow-500 text-white rounded hover">
                    ✏️
                </button>
                <button onClick={() => onDelete(route.id)} className="px-2 py-1 bg-red-500 text-white rounded hover">
                    🗑️
                </button>
            </td>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg relative w-2/4">
                        <button onClick={closePopup} className="absolute top-0 right-0 m-2 text-lg">
                            ✖️
                        </button>
                        <h2 className="text-lg font-semibold mb-4">Edit Route</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start</label>
                                <select
                                    name="start"
                                    value={formData.start}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                >
                                    {stations.map(station => (
                                        <option key={station.id} value={station.id}>{station.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Stops</label>
                                {stations.map(station => (
                                    <div key={station.id} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            id={`waypoint-${station.id}`}
                                            name="waypoint"
                                            value={station.id}
                                            checked={selectedWaypoints.some(wp => wp.id === station.id)}
                                            onChange={(e) => handleWaypointChange(e, station.id)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`waypoint-${station.id}`}
                                               className="mr-2 text-gray-700">{station.name}</label>
                                        {selectedWaypoints.some(wp => wp.id === station.id) && (
                                            <input
                                                type="number"
                                                name={`stopOrder-${station.id}`}
                                                value={selectedWaypoints.find(wp => wp.id === station.id)?.stopOrder || ''}
                                                onChange={(e) => handleWaypointChange(e, station.id)}
                                                className="w-16 p-2 border rounded"
                                                min="1"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End</label>
                                <select
                                    name="end"
                                    value={formData.end}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                >
                                    {stations.map(station => (
                                        <option key={station.id} value={station.id}>{station.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">BS</label>
                                <input
                                    type="text"
                                    name="bs"
                                    value={formData.bs}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <input
                                    type="text"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
                                />
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={closePopup}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </tr>
    );
};

export default RouteItem;
