import React, { useState } from 'react';

const RouteForm = ({ route, onSave }) => {
    const [formData, setFormData] = useState(route || { name: '', start: '', from: '', to: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên"
                className="w-full px-4 py-2 border rounded"
            />
            <input
                name="start"
                value={formData.start}
                onChange={handleChange}
                placeholder="Nơi bắt đầu"
                className="w-full px-4 py-2 border rounded"
            />
            <input
                name="from"
                value={formData.from}
                onChange={handleChange}
                placeholder="Xuất phát từ"
                className="w-full px-4 py-2 border rounded"
            />
            <input
                name="to"
                value={formData.to}
                onChange={handleChange}
                placeholder="Tới của tuyến"
                className="w-full px-4 py-2 border rounded"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
            </button>
        </form>
    );
};

export default RouteForm;
