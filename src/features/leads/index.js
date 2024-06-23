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
    const routesPerPage = 6;
    const [isCreating, setIsCreating] = useState(false);

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzYWlnb253YXRlcmJ1cy5jb20udm4iLCJzdWIiOiJwaHVvbmciLCJleHAiOjE3MTkxMzY0NDQsImlhdCI6MTcxOTEzMzQ0NCwic2NvcGUiOiJBRE1JTiJ9.LAVv4eNU-gzRJsLwZhM2rRbR9L80Q1WK96PxtxGxKYQmJnMt0akd7nCLG5Co5gg0lDYLguIaNbdMz3M_iIZgwg';

    const fetchRoutes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/admin/route', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const apiRoutes = response.data.result.map(route => ({
                id: route.id,
                start: route.fromTerminal.name,
                stops: route.waypoints.map(wp => wp.station.name).join(', '),
                end: route.toTerminal.name,
                name: route.nameRoute,
                bs: `SG00${route.id}`,
                status: route.status,
                // Adding waypoints to route object for editing
                waypoints: route.waypoints.map(wp => ({
                    id: wp.station.id,
                    stopOrder: wp.stopOrder
                })),
            }));
            setRoutes(apiRoutes);
        } catch (error) {
            console.error('Error fetching routes:', error);
        }
    };

    const fetchStations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/saigonwaterbus/Station', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const apiStation = response.data.result.map(station => ({
                id: station.id,
                name: station.name,
                addressStation: station.addressStation,
            }));
            setStations(apiStation);
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    };

    useEffect(() => {
        fetchRoutes();
        fetchStations();
    }, []);

    const handleEdit = (route) => {
        setEditingRoute(route); // Set the editing route
        setIsCreating(false); // Ensure creation mode is off
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/admin/route/delete/${id}`, {
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
                // Update existing route
                await axios.put(`http://localhost:8080/api/admin/route/update/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            } else {
                // Add new route
                const response = await axios.post('http://localhost:8080/api/admin/route/save', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                formData.id = response.data.id; // Update ID from server
            }
            fetchRoutes(); // Fetch updated routes
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

    const indexOfLastRoute = currentPage * routesPerPage;
    const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
    const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);

    const totalPageNumbers = Math.ceil(filteredRoutes.length / routesPerPage);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => (prevPage < totalPageNumbers ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPageNumbers);
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
                    <RouteList routes={currentRoutes} onEdit={handleEdit} onDelete={handleDelete} stations = {stations}/>
                    <div className="mt-4 flex justify-center">
                        <button onClick={handleFirstPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            First
                        </button>
                        <button onClick={handlePrevPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Previous
                        </button>
                        <button onClick={handleNextPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Next
                        </button>
                        <button onClick={handleLastPage} className="px-4 py-2 mx-1 bg-blue-500 text-white rounded">
                            Last
                        </button>
                    </div>
                </>
            )}
            {(isCreating || editingRoute) && (
                <div id="editForm">
                    <RouteForm
                        route={editingRoute} // Pass editingRoute to RouteForm for editing
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
