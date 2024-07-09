import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../common/headerSlice';
import './styleButtonTrip.css'
const AddTripForm = () => {
    const [trips, setTrips] = useState([]);
    const [route, setRoute] = useState([]);
    const [station, setStation] = useState([]);
    const [ship, setShip] = useState([]);
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        id: '',
        departureDate: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        route: {
            nameRoute: '', // Updated to string instead of object
            fromTerminal: { name: '' },
            toTerminal: { name: '' },
        },
        status: '',
        ship:{
            id:'',
            totalSeats:'',
            createAt:'',
            updateAt:'',
            deleteAt:'',
            status:'',
        }
    });

    const changeLayout = () => {
        return (window.location.href = 'http://localhost:3000/admin/chuyen-tau');
    };

    const Fillroute = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/route', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setRoute(response.data.result);
        console.log(response.data.result);
    };
    const FillStation = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/station', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setStation(response.data.result);
        console.log(response.data.result);
    };
    const FillShip = async () => {
        const response = await axios.get('http://localhost:8080/api/saigonwaterbus/admin/ship', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setShip(response.data.result);
        console.log(response.data.result);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle({ title: 'Chuyến tàu: Thêm Chuyến Tàu' }));
        Fillroute();
        FillStation();
        FillShip()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddTrip = (newTrip) => {
        // Add new trip to the trips state
        setTrips([...trips, newTrip]);
        // You can perform further actions like sending data to server here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTrip(formData);
        // Reset form after submit if needed
        setFormData({
            id: '',
            departureDate: '',
            departureTime: '',
            arrivalTime: '',
            availableSeats: '',
            route: {
                nameRoute: '', // Resetting nameRoute to empty string
                fromTerminal: { name: '' },
                toTerminal: { name: '' },
            },
            status: '',
        });
    };

    const handleDateChange = (date, field) => {
        setFormData({
            ...formData,
            [field]: date,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-2 gap-6 max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="col-span-1">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Ngày khởi hành:</label>
                    <DatePicker
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        selected={formData.departureDate}
                        onChange={(date) => handleDateChange(date, 'departureDate')}
                        showTimeSelect
                        dateFormat="yyyy/MM/dd HH:mm"
                        placeholderText="Chọn ngày giờ"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian khởi hành:</label>
                    <DatePicker
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        selected={formData.departureTime}
                        onChange={(date) => handleDateChange(date, 'departureTime')}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="HH:mm"
                        placeholderText="Chọn thời gian"
                    />
                </div>
            </div>
            <div className="col-span-1">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Thời gian đến:</label>
                    <DatePicker
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        selected={formData.arrivalTime}
                        onChange={(date) => handleDateChange(date, 'arrivalTime')}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="HH:mm"
                        placeholderText="Chọn thời gian"
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
            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tuyến đường:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="route.nameRoute"
                    value={formData.route.nameRoute}
                    onChange={handleChange}
                >
                    <option value="">Chọn tuyến đường</option>
                    {route.map((routeItem) => (
                        <option key={routeItem.id} value={routeItem.nameRoute}>
                            {routeItem.nameRoute}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-span-1 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ga đi:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="route.fromTerminal.name"
                    value={formData.route.fromTerminal.name}
                    onChange={handleChange}
                >
                    <option value="">Chọn ga đi</option>
                    {station.map((station) => (
                        <option key={station.id} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-span-1 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ga đến:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="route.toTerminal.name"
                    value={formData.route.toTerminal.name}
                    onChange={handleChange}
                >
                    <option value="">Chọn ga đến</option>
                    {station.map((station) => (
                        <option key={station.id} value={station.name}>
                            {station.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tàu:</label>
                <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="shipId"
                    value={formData.shipId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Chọn tàu</option>
                    {ship.map((ship) => (
                        <option key={ship.id} value={ship}>{ship.id}</option>
                    ))}
                </select>
            </div>
            <div className="col-span-2 mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Trạng thái:</label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    placeholder="Trạng thái"
                />
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
                    type="button" // Changed to type button
                    onClick={changeLayout}
                >
                    Trở lại
                </button>
            </div>
        </form>
    );
};

export default AddTripForm;
