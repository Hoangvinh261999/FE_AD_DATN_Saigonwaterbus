import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RouteList from './components/routelist';
import RouteForm from './components/routeForm';

const generateRoutes = (num) => {
    const routes = [];
    for (let i = 1; i <= num; i++) {
        const name = `Route ${i}`;
        const start = `Start ${i}`;
        const from = `From ${i}`;
        const to = `To ${i}`;
        routes.push({ id: i.toString(), name, start, from, to });
    }
    return routes;
};

const initialRoutes = generateRoutes(100);

const RouteManagement = () => {
    const [routes, setRoutes] = useState(initialRoutes);
    const [editingRoute, setEditingRoute] = useState(null);
    const navigate = useNavigate();

    const saveRoute = (route) => {
        if (route.id) {
            setRoutes(routes.map(r => r.id === route.id ? route : r));
        } else {
            route.id = (routes.length + 1).toString();
            setRoutes([...routes, route]);
        }
        setEditingRoute(null);
        navigate('/');
    };

    const handleEdit = (route) => {
        setEditingRoute(route);
        navigate('/edit');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Quản lý tuyến</h1>
            <nav className="mb-6 flex space-x-4">
                <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Home</Link>
                <Link to="/new" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Route</Link>
            </nav>
            {editingRoute ? (
                <RouteForm route={editingRoute} onSave={saveRoute} />
            ) : (
                <RouteList routes={routes} onEdit={handleEdit} />
            )}
        </div>
    );
};

export default RouteManagement;
