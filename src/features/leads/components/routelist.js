import React, { useState } from 'react';
import RouteItem from './routeItem';
import routes from "../../../routes";

const RouteList = ({ routes, onEdit, onDelete }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const routesPerPage = 5;

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const filteredRoutes = routes.filter(route =>
        route.name.toLowerCase().includes(search.toLowerCase()) ||
        route.start.toLowerCase().includes(search.toLowerCase()) ||
        route.from.toLowerCase().includes(search.toLowerCase()) ||
        route.to.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastRoute = currentPage * routesPerPage;
    const indexOfFirstRoute = indexOfLastRoute - routesPerPage;
    const currentRoutes = filteredRoutes.slice(indexOfFirstRoute, indexOfLastRoute);

    const totalPages = Math.ceil(filteredRoutes.length / routesPerPage);

    const onPageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search..."
                className="mb-4 px-4 py-2 border rounded w-full"
            />
            <table className="w-full border-collapse">
                <thead>
                <tr>
                    <th className="px-4 py-2 border">Tên</th>
                    <th className="px-4 py-2 border">Nơi bắt đầu</th>
                    <th className="px-4 py-2 border">Xuất phát từ</th>
                    <th className="px-4 py-2 border">Tới của tuyến</th>
                    <th className="px-4 py-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentRoutes.map(route => (
                    <RouteItem key={route.id} route={route} onEdit={onEdit} onDelete={onDelete} />
                ))}
                </tbody>
            </table>
            <div className="flex justify-center space-x-2 mt-4">
                <button
                    onClick={() => onPageChange(1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    First
                </button>
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={() => onPageChange(totalPages)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default RouteList;
