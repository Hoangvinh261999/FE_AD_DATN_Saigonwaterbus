import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

const RouteForm = ({ route, onSave, setIsCreating, setEditingRoute, stations }) => {
    const { id } = useParams();
    const [nameRoute, setNameRoute] = useState('');
    const [fromStationId, setFromStationId] = useState('');
    const [toStationId, setToStationId] = useState('');
    const [selectedWaypoints, setSelectedWaypoints] = useState([]);
    const [status, setStatus] = useState('ACTIVE');
       const token = localStorage.getItem("token");

    useEffect(() => {
        if (route) {
            setNameRoute(route.nameRoute);
            setFromStationId(route.fromTerminal.id);
            setToStationId(route.toTerminal.id);
            setSelectedWaypoints(route.waypoints.map(wp => ({
                id: wp.station.id,
                stopOrder: wp.stopOrder
            })));
            setStatus(route.status);
        } else if (id) {
            // Fetch route by ID if route not provided and id exists in URL
            fetchRouteById(id);
        }
    }, [route, id]);

    const fetchRouteById = async (routeId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/admin/route/${routeId}`, {
   headers: {
               Authorization: `Bearer ${token}`,
            }
            });
            const routeData = response.data;
            setNameRoute(routeData.nameRoute);
            setFromStationId(routeData.fromTerminal.id);
            setToStationId(routeData.toTerminal.id);
            setSelectedWaypoints(routeData.waypoints.map(wp => ({
                id: wp.station.id,
                stopOrder: wp.stopOrder
            })));
            setStatus(routeData.status);
        } catch (error) {
            console.error('Error fetching route:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id, // Include ID if available
            nameRoute,
            fromTerminal: { id: fromStationId },
            toTerminal: { id: toStationId },
            waypoints: selectedWaypoints.map(wp => ({
                station: { id: wp.id },
                stopOrder: wp.stopOrder
            })),
            status,
        };
        console.log(formData);
        onSave(formData);
    };

    const handleWaypointChange = (e, stationId) => {
        const { name, value, checked } = e.target;
        setSelectedWaypoints(prevWaypoints => {
            if (name === 'waypoint') {
                if (checked) {
                    return [...prevWaypoints, { id: stationId, stopOrder: prevWaypoints.length + 1 }];
                } else {
                    return prevWaypoints.filter(wp => wp.id !== stationId);
                }
            } else if (name.startsWith('stopOrder-')) {
                return prevWaypoints.map(wp => wp.id === stationId ? { ...wp, stopOrder: Number(value) } : wp);
            }
            return prevWaypoints;
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="mb-4">
                <label htmlFor="nameRoute" className="block text-gray-700">Tên tuyến:</label>
                <input
                    id="nameRoute"
                    type="text"
                    value={nameRoute}
                    onChange={(e) => setNameRoute(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="fromStation" className="block text-gray-700">Bến đi:</label>
                <select
                    id="fromStation"
                    value={fromStationId}
                    onChange={(e) => setFromStationId(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Chọn bến đi</option>
                    {stations.map(station => (
                        <option key={station.id} value={station.id}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="toStation" className="block text-gray-700">Bến đến:</label>
                <select
                    id="toStation"
                    value={toStationId}
                    onChange={(e) => setToStationId(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Chọn bến đến</option>
                    {stations.map(station => (
                        <option key={station.id} value={station.id}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Bến dừng:</label>
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
                        <label htmlFor={`waypoint-${station.id}`} className="mr-2 text-gray-700">{station.name}</label>
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
            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700">Trạng thái:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border rounded"
                >
                    <option value="ACTIVE">Hoạt động</option>
                    <option value="INACTIVE">Không hoạt động</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={() => {
                        setIsCreating(false);
                        setEditingRoute(null);
                    }}
                    className="px-4 py-2 mr-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    Hủy
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default RouteForm;