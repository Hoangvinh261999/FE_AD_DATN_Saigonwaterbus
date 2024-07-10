import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { setPageTitle } from "../common/headerSlice";
import axios from "axios";
import StationList from './components/StationList';

function StationManager() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [stations, setStations] = useState([]);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle({ title: " Bến tàu " }));
        getStations();
    }, [page, size]);

    const getStations = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/stations?page=${page}&size=${size}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStations(response.data.result.content);
            setTotalPages(response.data.result.totalPages);
            console.log(response.data.result.content)
        } catch (error) {
            console.error("Error fetching stations:", error);
        }
    };

    const handleCreate = async (newStation) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/saigonwaterbus/admin/station/save`, newStation, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.code);
            getStations();
            window.alert('Tạo bến tàu mới thành công!');
        } catch (error) {
            console.error("Error creating station:", error);
            window.alert('Tạo bến tàu mới thất bại!');
        }
    };

    const handleUpdate = async (station) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/station/update`, station, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.alert('cập nhật bến tàu thành công ');
            getStations();
        } catch (error) {
            window.alert('cập nhật bến tàu thất bại!');
            console.error("Error updating station:", error);
        }
    };

    const handleDelete = async (idStation) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/station/delete/${idStation}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            getStations();
            window.alert('Xóa bến tàu thành công!');
        } catch (error) {
            console.error("Error deleting station:", error);
            window.alert('Xóa bến tàu thất bại!');
        }
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <div>
            <StationList
                stations={stations}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
            <div>
                <div className="flex items-center justify-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 0}
                        className={`bg-blue-500 text-white py-2 px-4 rounded flex items-center mr-2
                    ${page === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <span className="text-lg">Trang {page + 1} / {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={page === totalPages - 1}
                        className={`bg-blue-500 text-white py-2 px-4 rounded flex items-center ml-2
                    ${page === totalPages - 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                             className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StationManager;
