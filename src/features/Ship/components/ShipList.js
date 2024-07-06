import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function ShipList() {
    const [ships, setShips] = useState([]);
    const token = localStorage.getItem("token");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    useEffect(() => {
        getShip();
    },  [currentPage, pageSize]);

    const getShip = async () => {
        const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/tau?page=${currentPage}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setShips(response.data.content);
        console.log(response.data.content)
    };
    const [selectedShip, setSelectedShip] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (ship) => {
        setSelectedShip(ship);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedShip(null);
    };
    function getStatus(status) {
        if (status === "ACTIVE") {
            return "đang hoạt động";
        } else {
            return "không hoạt động";
        }
    }
    useEffect(() => {
        console.log(ships)
    }, []);
    return (
        <div className="container mx-auto p-4">

            <div className="flex justify-end mb-4">
                <Link to="/admin/trips/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                    Thêm tàu
                </Link>
            </div>
            <div className="overflow-x-auto">
                            <h2 className="font-bold text-xl">Danh sách tàu</h2>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">STT</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tổng ghế</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Trạng thái</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày nhập</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Công Cụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map((ship) => (
                            <tr key={ship.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(ship)}>
                                <td className="px-6 py-4 whitespace-nowrap">{ship.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{ship.totalSeats}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{getStatus(ship.status)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{ship.createAt}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button className="text-blue-500 hover:text-blue-700 font-bold mr-2">
                                        ✏Edit
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 font-bold">
                                        ❌Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center">
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 0}>
                                     <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        >
                                        <path d="M15 18l-6-6 6-6" />
                                        </svg>
                                </button>
                                <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => setCurrentPage(currentPage + 1)} disabled={ships.length < pageSize}>
                                       <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        height="1em"
                                        width="1em"
                                        >
                                        <path d="M9 18l6-6-6-6" />
                                        </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Chi Tiết Tàu</h2>
                        <p className="mb-2"><strong>ID:</strong> {selectedShip.id}</p>
                        <p className="mb-2"><strong>Tổng ghế:</strong> {selectedShip.totalSeats}</p>
                        <p className="mb-2"><strong>Trạng thái:</strong> {selectedShip.status}</p>
                        <p className="mb-2"><strong>Ngày nhập:</strong> {selectedShip.createAt}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShipList;
