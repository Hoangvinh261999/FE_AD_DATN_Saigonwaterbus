import React, {useEffect, useState} from 'react';
import {setPageTitle} from "../common/headerSlice";
import {useDispatch} from "react-redux";

function TripList({ trips, onDelete, onSave, onAdd }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTrip, setEditedTrip] = useState(null);
    const [newTrip, setNewTrip] = useState({
        departureTime: '',
        availableSeats: '',
        departureDate: '',
        arrivalTime: '',
        route: '',
        ship: ''
    });

    const handleSave = () => {
        onSave(editedTrip);
        setEditedTrip(null);
        setShowEditModal(false);
    };

    const handleCancel = () => {
        setEditedTrip(null);
        setShowEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTrip(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleNewTripChange = (e) => {
        const { name, value } = e.target;
        setNewTrip(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddTrip = () => {
        onAdd(newTrip);
        setNewTrip({
            departureTime: '',
            availableSeats: '',
            departureDate: '',
            arrivalTime: '',
            route: '',
            ship: ''
        });
        setShowAddModal(false);
    };
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Chuyến Tàu"}))
    }, [])
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <h3 className="text-xl font-bold mb-4">Danh Sách Các Chuyến Tàu</h3>
            {trips.length === 0 ? (
                <p className="text-gray-700">Không có chuyến tàu nào.</p>
            ) : (
                <table className="hover:table-fixed">
                    <thead>
                    <tr>
                        <th className="border-b p-2">Giờ khởi hành</th>
                        <th className="border-b p-2">Số ghế khả dụng</th>
                        <th className="border-b p-2">Ngày khởi hành</th>
                        <th className="border-b p-2">Giờ đến</th>
                        <th className="border-b p-2">Tuyến tàu</th>
                        <th className="border-b p-2">Tàu</th>
                        <th className="border-b p-2">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trips.map((trip, index) => (
                        <tr key={index}>
                            <td className="border-b p-2">{trip.departureTime}</td>
                            <td className="border-b p-2">{trip.availableSeats}</td>
                            <td className="border-b p-2">{trip.departureDate}</td>
                            <td className="border-b p-2">{trip.arrivalTime}</td>
                            <td className="border-b p-2">{trip.route}</td>
                            <td className="border-b p-2">{trip.ship}</td>
                            <td className="border-b p-2">
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
                                    onClick={() => {
                                        setEditedTrip(trip);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => onDelete(index)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Button to add new trip */}
            <div className="mt-4">
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => setShowAddModal(true)}
                >
                    Thêm Chuyến Tàu
                </button>
            </div>

            {/* Modal thêm mới */}
            {showAddModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Thêm Chuyến Tàu Mới</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newDepartureTime">
                                Giờ khởi hành
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newDepartureTime"
                                type="text"
                                name="departureTime"
                                value={newTrip.departureTime}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newAvailableSeats">
                                Số ghế khả dụng
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newAvailableSeats"
                                type="number"
                                name="availableSeats"
                                value={newTrip.availableSeats}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newDepartureDate">
                                Ngày khởi hành
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newDepartureDate"
                                type="text"
                                name="departureDate"
                                value={newTrip.departureDate}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newArrivalTime">
                                Giờ đến
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newArrivalTime"
                                type="text"
                                name="arrivalTime"
                                value={newTrip.arrivalTime}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newRoute">
                                Tuyến tàu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newRoute"
                                type="text"
                                name="route"
                                value={newTrip.route}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="newShip">
                                Tàu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="newShip"
                                type="text"
                                name="ship"
                                value={newTrip.ship}
                                onChange={handleNewTripChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleAddTrip}
                            >
                                Thêm Chuyến Tàu
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                                onClick={() => setShowAddModal(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal sửa */}
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Sửa Chuyến Tàu</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editDepartureTime">
                                Giờ khởi hành
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editDepartureTime"
                                type="text"
                                name="departureTime"
                                value={editedTrip.departureTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editAvailableSeats">
                                Số ghế khả dụng
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editAvailableSeats"
                                type="number"
                                name="availableSeats"
                                value={editedTrip.availableSeats}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editDepartureDate">
                                Ngày khởi hành
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editDepartureDate"
                                type="text"
                                name="departureDate"
                                value={editedTrip.departureDate}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editArrivalTime">
                                Giờ đến
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editArrivalTime"
                                type="text"
                                name="arrivalTime"
                                value={editedTrip.arrivalTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editRoute">
                                Tuyến tàu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editRoute"
                                type="text"
                                name="route"
                                value={editedTrip.route}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="editShip">
                                Tàu
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="editShip"
                                type="text"
                                name="ship"
                                value={editedTrip.ship}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                                onClick={handleCancel}
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

const initialTrips = [
    {
        departureTime: '08:00 AM',
        availableSeats: 20,
        departureDate: '2024-06-11',
        arrivalTime: '12:00 PM',
        route: 'Hà Nội - Hải Phòng',
        ship: 'Tàu SE1',
    },
    {
        departureTime: '09:30 AM',
        availableSeats: 15,
        departureDate: '2024-06-11',
        arrivalTime: '01:30 PM',
        route: 'Hà Nội - Sài Gòn',
        ship: 'Tàu SE3',
    },
    {
        departureTime: '02:00 PM',
        availableSeats: 30,
        departureDate: '2024-06-12',
        arrivalTime: '06:00 PM',
        route: 'Đà Nẵng - Nha Trang',
        ship: 'Tàu SE5',
    },
];

export default function App() {
    const [trips, setTrips] = useState(initialTrips);
    const [editedTrip, setEditedTrip] = useState(null);

    const handleSave = (updatedTrip) => {
        const updatedTrips = [...trips];
        const index = updatedTrips.findIndex(trip => trip === editedTrip);
        updatedTrips[index] = updatedTrip;
        setTrips(updatedTrips);
        setEditedTrip(null);
    };

    const handleDelete = (index) => {
        const updatedTrips = [...trips];
        updatedTrips.splice(index, 1);
        setTrips(updatedTrips);
    };

    const handleAdd = (newTrip) => {
        setTrips([...trips, newTrip]);
    };

    return (
        <TripList
            trips={trips}
            onDelete={handleDelete}
            onSave={handleSave}
            onAdd={handleAdd}
            editedTrip={editedTrip}
            onCancelEdit={() => setEditedTrip(null)}
        />
    );
}
