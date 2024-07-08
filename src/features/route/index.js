import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RouteList from './components/routelist';
import RouteForm from './components/routeForm';

const RouteManagement = () => {
    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isCreating, setIsCreating] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 2;
    const token = localStorage.getItem("token");

    const fetchRoutes = async (page = 1) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/routes?page=${page - 1}&size=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = response.data.result;
            if (result && Array.isArray(result.content)) {
                const apiRoutes = result.content.map(route => ({
                    id: route.id,
                    start: route.fromTerminal.name,
                    stops: route.waypoints.map(wp => wp.station.name).join(', '),
                    end: route.toTerminal.name,
                    name: route.nameRoute,
                    bs: `SG00${route.id}`,
                    status: route.status,
                    waypoints: route.waypoints.map(wp => ({
                        id: wp.station.id,
                        stopOrder: wp.stopOrder
                    })),
                }));
                setRoutes(apiRoutes);
                setTotalPages(result.totalPages);
            } else {
                console.error('Expected an array for routes:', result.content);
            }
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/stations', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = response.data.result;
            if (result && Array.isArray(result.content)) {
                const apiStations = result.content.map(station => ({
                    id: station.id,
                    name: station.name,
                    addressStation: station.addressStation,
                }));
                setStations(apiStations);
            } else {
                console.error('Expected an array for stations:', result.content);
            }
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    useEffect(() => {
        fetchRoutes(currentPage);
        fetchStations();
    }, [currentPage]);

    const handleEdit = (route) => {
        setEditingRoute(route);
        setIsCreating(false);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/route/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRoutes(routes.filter(route => route.id !== id));
        } catch (error) {
            console.error('Error deleting route:', error);
        }
    };

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const handleSearchStatusChange = (e) => {
        setSearchStatus(e.target.value);
    };

    const handleSaveRoute = async (formData) => {
        try {
            if (formData.id) {
                await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/route/update/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                const response = await axios.post('http://localhost:8080/api/saigonwaterbus/admin/route/save', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                formData.id = response.data.id;
            }
            fetchRoutes(currentPage);
            setEditingRoute(null);
            setIsCreating(false);
        } catch (error) {
            console.error('Error saving route:', error);
        }
    };

    const filteredRoutes = routes.filter(route =>
        (!searchName || route.name.toLowerCase().includes(searchName.toLowerCase())) &&
        (!searchStatus || route.status.toLowerCase() === searchStatus.toLowerCase())
    );

    const uniqueStatuses = [...new Set(routes.map(route => route.status))];

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý tuyến</h1>
            <div className="mb-4 flex justify-between items-center space-x-4">
                <div>
                    <label htmlFor="searchName" className="mr-2">Tìm kiếm theo tên:</label>
                    <input
                        id="searchName"
                        type="text"
                        value={searchName}
                        onChange={handleSearchNameChange}
                        className="p-2 border rounded"
                    />
                </div>
                <div>
                    <label htmlFor="searchStatus" className="mr-2">Chọn trạng thái:</label>
                    <select
                        id="searchStatus"
                        value={searchStatus}
                        onChange={handleSearchStatusChange}
                        className="p-2 border rounded"
                    >
                        <option value="">Tất cả</option>
                        {uniqueStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="ml-3 px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700">
                    ➕ Thêm Mới
                </button>
            </div>
            {!isCreating && !editingRoute && (
                <>
                    <RouteList routes={filteredRoutes} onEdit={handleEdit} onDelete={handleDelete} stations={stations} />
                    <div className="mt-4 flex justify-center">
                        <button onClick={() => handlePageChange(1)} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Đầu
                        </button>
                        <button onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Trước
                        </button>
                        <button onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Tiếp
                        </button>
                        <button onClick={() => handlePageChange(totalPages)} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Cuối
                        </button>
                    </div>
                </>
            )}
            {(isCreating || editingRoute) && (
                <div id="editForm">
                    <RouteForm
                        route={editingRoute}
                        onSave={handleSaveRoute}
                        setIsCreating={setIsCreating}
                        setEditingRoute={setEditingRoute}
                        stations={stations}
                    />
                </div>
            )}
        </div>
    );
};

export default RouteManagement;
