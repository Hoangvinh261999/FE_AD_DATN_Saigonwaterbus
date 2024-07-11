import React from 'react';
import RouteItem from './routeItem';

const RouteList = ({ routes, onEdit, onDelete,stations }) => {
    return (
        <table className="min-w-full  shadow-md rounded-lg overflow-hidden border-collapse">
            <thead className='bg-sky-500'>
            <tr>
                <th className="border text-center py-2 px-4">STT</th>
                <th className="border text-center py-2 px-4">Bến đi</th>
                <th className="border text-center py-2 px-4">Bến dừng</th>
                <th className="border text-center py-2 px-4">Bến đến</th>
                <th className="border text-center py-2 px-4">Tên tuyến</th>
                <th className="border text-center py-2 px-4">Trạng thái</th>
                <th className="border text-center py-2 px-4">Tùy chọn</th>
            </tr>
            </thead>
            <tbody>
            {routes.map((route,index) => (
                <RouteItem key={route.id} route={route} onEdit={onEdit} onDelete={onDelete} stations = {stations} stt={index} />
            ))}
            </tbody>
        </table>
    );
};

export default RouteList;
