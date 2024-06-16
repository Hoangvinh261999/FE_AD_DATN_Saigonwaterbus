import React from 'react';

const RouteItem = ({ route, onEdit, onDelete }) => {
    return (
        <tr>
            <td className="px-4 py-2 border">{route.name}</td>
            <td className="px-4 py-2 border">{route.start}</td>
            <td className="px-4 py-2 border">{route.from}</td>
            <td className="px-4 py-2 border">{route.to}</td>
            <td className="px-4 py-2 border">
                <button onClick={() => onEdit(route)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                </button>
                <button onClick={() => onDelete(route)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default RouteItem;
