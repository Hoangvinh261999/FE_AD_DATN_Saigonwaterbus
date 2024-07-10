import React from 'react';
import RouteItem from './routeItem';

const RouteList = ({ routes, onEdit, onDelete,stations }) => {
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzYWlnb253YXRlcmJ1cy5jb20udm4iLCJzdWIiOiJwaHVvbmciLCJleHAiOjE3MTg4ODQ0MjUsImlhdCI6MTcxODg4MTQyNSwic2NvcGUiOiJBRE1JTiJ9.xWR3OWd36TFHgp0PS6nIMake7kP8uDKdZ126FM8gl138xQ-_90_Ph1CtQSYUdhXh7Yb_Ka6-aaMN67Ugus0w9w';
    return (
        <table className="min-w-full bg-white border-collapse">
            <thead>
            <tr>
                <th className="border px-4 py-2">STT</th>
                <th className="border px-4 py-2">Bến đi</th>
                <th className="border px-4 py-2">Bến dừng</th>
                <th className="border px-4 py-2">Bến đến</th>
                <th className="border px-4 py-2">Tên tuyến</th>
                <th className="border px-4 py-2">Trạng thái</th>
                <th className="border px-4 py-2">Tùy chọn</th>
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
