import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {setPageTitle} from "../features/common/headerSlice";

function RouteForm() {
    const [name, setName] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [to, setTo] = useState('');
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const handleLocationChange = (location) => {
        if (selectedLocations.includes(location)) {
            setSelectedLocations(selectedLocations.filter(loc => loc !== location));
        } else {
            setSelectedLocations([...selectedLocations, location]);
        }
    };
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thêm tuyến"}))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        setName('');
        setStartLocation('');
        setTo('');

        const data = { name, startLocation, stayLocation: selectedLocations, to };
        console.log(data);
    };

    const locations = ['Địa điểm 1', 'Địa điểm 2', 'Địa điểm 3'];
    const status = ['Active', 'Inactive', 'Notyet'];
    const handleStatusChange = (status) => {
        setSelectedStatus(status);
    };
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Thêm Tuyến Mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Tên
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startLocation">
                        Bến Khởi Hành
                    </label>
                    <select
                        id="startLocation"
                        value={startLocation}
                        onChange={(e) => setStartLocation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">Chọn Nơi Bắt Đầu</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Bến Dừng
                    </label>
                    {/*{locations.map((location) => (*/}
                    {/*    <div key={location} className="mb-2">*/}
                    {/*        <input*/}
                    {/*            type="checkbox"*/}
                    {/*            id={location}*/}
                    {/*            value={location}*/}
                    {/*            checked={selectedLocations.includes(location)}*/}
                    {/*            onChange={() => handleLocationChange(location)}*/}
                    {/*            className="mr-2 leading-tight"*/}
                    {/*        />*/}
                    {/*        <label htmlFor={location} className="text-sm">*/}
                    {/*            {location}*/}
                    {/*        </label>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    <div className='flex justify-between'>
                        <div className='w-full'>
                            <label>Bến Dừng 1</label>
                            <select
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Chọn đích đến</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <label>Bến Dừng 2</label>
                            <select
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Chọn đích đến</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='w-full'>
                            <label>Bến Dừng 3</label>
                            <select
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="">Chọn đích đến</option>
                                {locations.map((location) => (
                                    <option key={location} value={location}>
                                        {location}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Trạng Thái
                    </label>
                    <div className='flex justify-between w-2/5'>
                    {status.map((statusOption) => (
                        <div key={statusOption} className="mb-2">
                            <input
                                type="radio"
                                id={statusOption}
                                name="status"
                                value={statusOption}
                                checked={selectedStatus === statusOption}
                                onChange={() => handleStatusChange(statusOption)}
                                className="mr-2 leading-tight"
                            />
                            <label htmlFor={statusOption} className="text-sm">
                                {statusOption}
                            </label>
                        </div>
                    ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Thêm
                </button>
            </form>
        </div>
    );
}

export default RouteForm;
