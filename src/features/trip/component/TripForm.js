import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../common/headerSlice';

const AddTripForm = () => {
    const [trips, setTrips] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [stations, setStations] = useState([]);
    const [ships, setShips] = useState([]);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        id: "",
        departureDate: "",
        departureTime: "",
        arrivalTime: "",
        availableSeats: "",
        route: {
            id: ""
        },
        fixed:"",
        fromTerminal: "",
        toTerminal: "",
        status: "",
        ship: {
            id: ""
        }
    });

    const changeLayout = () => {
        return (window.location.href = 'http://localhost:3000/admin/chuyen-tau');
    };

    const fetchRoutes = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/routes', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRoutes(response.data.result.content);
    };

    const fetchStations = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/stations', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setStations(response.data.result.content);
    };

    const fetchShips = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/ship', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setShips(response.data.result);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle({ title: 'Chuyến tàu: Thêm Chuyến Tàu' }));
        fetchRoutes();
        fetchStations();
        fetchShips();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "status") {
            setFormData({
                ...formData,
                status: value,
            });
        } else if (name === "fixed") {
            setFormData({
                ...formData,
                fixed: value,
            });
        } else if (name === "routeId") {
            setFormData({
                ...formData,
                route: { id: value },
            });
        } else if (name === "shipId") {
            setFormData({
                ...formData,
                ship: { id: value },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleAddTrip = (newTrip) => {
        // Add new trip to the trips state
        setTrips([...trips, newTrip]);
        // You can perform further actions like sending data to server here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTrip(formData);
        create(formData);
        console.log(formData);
        // Reset form after submit if needed
        setFormData({
            id: "",
            departureDate: "",
            departureTime: "",
            arrivalTime: "",
            availableSeats: "",
            fixed:"FIXED",
            route: { id: "" },
            fromTerminal: "",
            toTerminal: "",
            status: "",
            ship: { id: "" }
        });

    };

    const create = async (formData) => {
        const response = await axios.post("http://localhost:8080/api/saigonwaterbus/admin/trip/save", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.data.code === 200) {
            window.alert('Tạo chuyến mới thành công!');
        } else {
            window.alert('Tạo chuyến mới thất bại!');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="col-span-1">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ngày khởi hành:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        placeholder="Chọn ngày khởi hành"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian khởi hành:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="time"
                        name="departureTime"
                        value={formData.departureTime}
                        onChange={handleChange}
                        placeholder="Chọn thời gian khởi hành"
                    />
                </div>
            </div>
            <div className="col-span-1">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian đến:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="time"
                        name="arrivalTime"
                        value={formData.arrivalTime}
                        onChange={handleChange}
                        placeholder="Chọn thời gian đến"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Số ghế trống:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="availableSeats"
                        value={formData.availableSeats}
                        onChange={handleChange}
                        placeholder="Số ghế trống"
                    />
                </div>
            </div>
            <div className="col-span-1 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tuyến:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="routeId"
                    value={formData.route.id}
                    onChange={handleChange}
                >
                    <option value="">Chọn tuyến</option>
                    {routes.map((route) => (
                        <option key={route.id} value={route.id}>
                            {route.nameRoute}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tàu:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="shipId"
                    value={formData.ship.id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn tàu</option>
                    {ships.map((ship) => (
                        <option key={ship.id} value={ship.id}>
                            {ship.id}
                        </option>
                    ))}
                </select>
            </div>
            {/* <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Trạng thái:</label>
                <input
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Trạng thái"
                />
            </div> */}


            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Trạng thái:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="ACTIVE">Hoạt động</option>
                    <option value="INACTIVE">Tạm dừng</option>
                </select>
            </div>
            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Chuyến Cố định:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="fixed"
                    value={formData.fixed}
                    onChange={handleChange}
                >
                    <option value="FIXED">Cố định</option>
                    <option value="UNSTABLE">Không cố định</option>
                </select>
            </div>

            <div className="col-span-2 flex justify-end">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Thêm Chuyến
                </button>
                <button
                    className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={changeLayout}
                >
                    Trở lại
                </button>
            </div>
        </form>
    );
};

export default AddTripForm;