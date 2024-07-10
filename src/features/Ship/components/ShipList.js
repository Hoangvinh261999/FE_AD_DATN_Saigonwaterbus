import React, { useEffect, useState } from 'react';
import axios from "axios";
import { formatDate } from '../../../utils/formatDate';

function ShipList() {
    const [ships, setShips] = useState([]);
    const [shipsWithSeats, setShipsWithSeats] = useState([]);
    const token = localStorage.getItem("token");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0); // State to keep track of total pages
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedShip, setSelectedShip] = useState(null);
    const [newShip, setNewShip] = useState({
        totalSeats: 0,
        status: "ACTIVE", // Default status
    });
    const [editShipStatus, setEditShipStatus] = useState("");
    const [deleteShipId, setDeleteShipId] = useState(null);

    useEffect(() => {
        getShips();
    }, [currentPage, pageSize]);

    const getShips = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/ships?page=${currentPage}&size=${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const ships = response.data.result.content;
            setShips(ships);
            setTotalPages(response.data.result.totalPages);

            // Kiểm tra và lưu trữ thông tin về tàu có ghế
            const shipsWithSeatsPromises = ships.map(async (ship) => {
                const seatCount = await getSeatByID(ship.id);
                return seatCount > 0 ? ship.id : null;
            });

            const shipsWithSeatsResults = await Promise.all(shipsWithSeatsPromises);
            setShipsWithSeats(shipsWithSeatsResults.filter(id => id !== null));
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

    const getSeatByID = async (shipid) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/seat/findcount/${shipid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.result.length; // Trả về số lượng phần tử trong mảng
        } catch (error) {
            console.error('Error fetching seats:', error);
            return 0; // Trả về 0 trong trường hợp có lỗi
        }
    };

    const getStatus = (status) => {
        return status === "ACTIVE" ? "đang hoạt động" : "không hoạt động";
    };

    const handleRowClick = (ship) => {
        setSelectedShip(ship);
        setIsViewModalOpen(true);
    };

    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeViewModal = () => {
        setIsViewModalOpen(false);
        setSelectedShip(null);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
        setNewShip({
            totalSeats: 0,
            status: "ACTIVE", // Reset form values
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewShip({
            ...newShip,
            [name]: value
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page
    };

    const handleEditShip = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/ship/update`, {
                id: selectedShip.id,
                totalSeats:selectedShip.totalSeats,
                status: editShipStatus,
                createAt:selectedShip.createAt,
                updateAt:new Date().toISOString().slice(0, 10),
                deleteAt:null
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship updated:', response.data.result);
            alert("Sửa thành công")
            getShips(); // Fetch ships again to update list
            closeViewModal(); // Close modal after successful update
        } catch (error) {
            console.error('Error updating ship:', error);
            // Handle error
        }
    };
    const handleAddShip = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/api/saigonwaterbus/admin/ship/save`, {
                totalSeats: newShip.totalSeats,
                status: newShip.status,
                createAt: new Date().toISOString().slice(0, 10),
                updateAt:null,
                deleteAt:null// Set createAt to today's date
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship added:', response.data.result);
            getShips(); // Fetch ships again to update list
            closeAddModal(); // Close modal after successful addition
        } catch (error) {
            console.error('Error adding ship:', error);
            // Handle error
        }
    };
    const handleDeleteShip = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/ship/delete/${selectedShip.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship deleted:', response.data.message);
            getShips(); // Fetch ships again to update list
            closeViewModal(); // Close modal after successful deletion
        } catch (error) {
            console.error('Error deleting ship:', error);
            // Handle error
        }
    };

    const CreateSeat = async (id) => {
        try {
            const idShip = id;
            const seatCount = await getSeatByID(idShip);
            console.log(seatCount);
            if (seatCount > 0) {
                window.alert("Không thể thêm ghế vì đã có ghế");
            } else {
                const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/add-seat/${idShip}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.code === 200) {
                    window.alert("Thêm ghế cho tàu thành công");
                } else {
                    window.alert("Thêm ghế cho tàu thất bại");
                }
            }
            getShips(); // Fetch ships again to update list after seat creation
        } catch (error) {
            console.error('Error adding seats:', error);
            window.alert("Lỗi khi thêm ghế");
        }
    };

    // Generate pagination buttons based on total pages
    const paginationItems = [];
    for (let i = 0; i < totalPages; i++) {
        paginationItems.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`px-3 py-1 ${currentPage === i ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'} mx-1`}
            >
                {i + 1}
            </button>
        );
    }

    return (
        <div className="container mx-auto p-4">

            <div className="flex justify-end mb-4">
                <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ">
                    Thêm tàu
                </button>
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
                        <tr key={ship.id} className="hover:bg-gray-100 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">{ship.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{ship.totalSeats}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{getStatus(ship.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(ship.createAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleRowClick(ship)}
                                        className="text-blue-500 hover:text-blue-700 font-bold mr-2">
                                    ✏ Cập Nhật
                                </button>
                                <button onClick={() => CreateSeat(ship.id)}
                                        disabled={shipsWithSeats.includes(ship.id)}
                                        className={`text-blue-500 hover:text-blue-700 font-bold mr-2 ${shipsWithSeats.includes(ship.id) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    ➕Tạo Ghế
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                {paginationItems}
            </div>

            {isViewModalOpen && selectedShip && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                        <button onClick={closeViewModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Chi Tiết Tàu</h2>
                        <p className="mb-2"><strong>ID:</strong> {selectedShip.id}</p>
                        <p className="mb-2"><strong>Tổng ghế:</strong> {selectedShip.totalSeats}</p>
                        <p className="mb-2"><strong>Trạng thái:</strong> {getStatus(selectedShip.status)}</p>
                        <p className="mb-2"><strong>Ngày nhập:</strong> {selectedShip.createAt}</p>

                        {/* Edit form */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Trạng thái mới</label>
                            <select
                                name="status"
                                value={editShipStatus}
                                onChange={(e) => setEditShipStatus(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="ACTIVE">Đang hoạt động</option>
                                <option value="INACTIVE">Ngừng hoạt động</option>
                            </select>
                            <button onClick={handleEditShip} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-2">
                                Lưu thay đổi
                            </button>
                        </div>

                        {/* Delete confirmation */}
                        <button onClick={handleDeleteShip} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4">
                            ❌ Xóa tàu
                        </button>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
                        <button onClick={closeAddModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Thêm Tàu</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Tổng số ghế</label>
                            <input
                                type="number"
                                name="totalSeats"
                                value={newShip.totalSeats}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <select
                                name="status"
                                value={newShip.status}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="ACTIVE">Đang hoạt động</option>
                                <option value="INACTIVE">Ngừng hoạt động</option>
                            </select>
                        </div>
                        <button onClick={handleAddShip} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                            Thêm Tàu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ShipList;
