import React from 'react';

const SelectStation = ({ stations, onChange }) => {
    const handleSelectChange = (e) => {
        const newStations = {
            ...stations,
            [e.target.name]: e.target.value,
        };
        onChange({ stations: newStations });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Chọn Bến</h2>
            <div className="flex space-x-4">
                <select
                    name="departure"
                    value={stations.departure}
                    onChange={handleSelectChange}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Chọn Bến Đi</option>
                    <option value="stationA">Bến A</option>
                    <option value="stationB">Bến B</option>
                </select>
                <select
                    name="arrival"
                    value={stations.arrival}
                    onChange={handleSelectChange}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Chọn Bến Đến</option>
                    <option value="stationA">Bến A</option>
                    <option value="stationB">Bến B</option>
                </select>
            </div>
        </div>
    );
};

export default SelectStation;
