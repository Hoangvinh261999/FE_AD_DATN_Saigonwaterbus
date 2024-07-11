import React, { useEffect, useState } from 'react';
import axios from "axios";
import { formatDate } from '../../../utils/formatDate';

function ShipList() {
    const [ships, setShips] = useState([]);
    const [shipsWithSeats, setShipsWithSeats] = useState([]);
    const token = localStorage.getItem("token");
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(7);
    const [totalPages, setTotalPages] = useState(0);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedShip, setSelectedShip] = useState(null);
    const [newShip, setNewShip] = useState({
        totalSeats: 0,
        status: "ACTIVE",
        numberPlate: "", // Thêm trường biển số
        createAt: "", // Thêm trường ngày nhập
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
            return response.data.result.length;
        } catch (error) {
            console.error('Error fetching seats:', error);
            return 0;
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
            status: "ACTIVE",
            numberPlate: "", // Reset form values
            createAt: "", // Reset form values
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewShip({
            ...newShip,
            [name]: value.toUpperCase() // Chuyển đổi thành chữ hoa và validate theo định dạng VN-1234
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleEditShip = async () => {
        try {
            const data ={
                id: selectedShip.id,
                totalSeats: selectedShip.totalSeats,
                status: editShipStatus,
                createAt: selectedShip.createAt, // Định dạng lại ngày nhập nếu cần thiết
                updateAt: new Date().toISOString().slice(0, 10),
                deleteAt: null,
                numberPlate: selectedShip.numberPlate // Thêm trường biển số
            }
            console.log(data)
            const response = await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/ship/update`,data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship updated:', response.data.result);
            alert("Sửa thành công");
            getShips();
            closeViewModal();
        } catch (error) {
            console.error('Error updating ship:', error);
        }
    };

    const handleAddShip = async () => {
        // Kiểm tra định dạng biển số VN-1234
        const licensePlatePattern = /^[A-Z]{2}-[0-9]{4}$/;
        if (!licensePlatePattern.test(newShip.numberPlate)) {
            alert('Định dạng biển số không hợp lệ. Vui lòng nhập lại theo định dạng VN-1234.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/saigonwaterbus/admin/ship/save`, {
                totalSeats: newShip.totalSeats,
                status: newShip.status,
                createAt: newShip.createAt,
                updateAt: null,
                deleteAt: null,
                numberPlate: newShip.numberPlate
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship added:', response.data.result);
            window.alert("them thanh cong")
            getShips();
            closeAddModal();
        } catch (error) {
            console.error('Error adding ship:', error);
        }
    };

    const handleDeleteShip = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/ship/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ship deleted:', response.data.message);
            getShips();
            closeViewModal();
        } catch (error) {
            console.error('Error deleting ship:', error);
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
            getShips();
        } catch (error) {
            console.error('Error adding seats:', error);
            window.alert("Lỗi khi thêm ghế");
        }
    };

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
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Biển số</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Công Cụ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ships.map((ship) => (
                        <tr key={ship.id} className="hover:bg-gray-100 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(ship)}>{ship.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(ship)}>{ship.totalSeats}</td>
                            <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(ship)}>{getStatus(ship.status)}</td>
                            <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(ship)}>{formatDate(ship.createAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap" onClick={() => handleRowClick(ship)}>{ship.numberPlate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => CreateSeat(ship.id)}
                                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded ${shipsWithSeats.includes(ship.id) && 'opacity-50 cursor-not-allowed'}`}>
                                    Thêm ghế
                                </button>
                                <button onClick={() => handleDeleteShip(ship.id)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Xóa tàu
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

            {isViewModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div
                        className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Chi tiết tàu</h3>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <label htmlFor="numberPlate"
                                                           className="block text-sm font-medium text-gray-700">Biển
                                                        số</label>
                                                    <input
                                                        type="text"
                                                        name="numberPlate"
                                                        id="numberPlate"
                                                        value={selectedShip?.numberPlate || ''}
                                                        onChange={(e) => setSelectedShip({
                                                            ...selectedShip,
                                                            numberPlate: e.target.value
                                                        })}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="createAt"
                                                           className="block text-sm font-medium text-gray-700">Ngày
                                                        nhập</label>
                                                    <input
                                                        type="date"
                                                        name="createAt"
                                                        id="createAt"
                                                        value={selectedShip?.createAt || ''}
                                                        onChange={(e) => setSelectedShip({
                                                            ...selectedShip,
                                                            createAt: e.target.value
                                                        })}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-2">
                                                    <label htmlFor="totalSeats"
                                                           className="block text-sm font-medium text-gray-700">Tổng số
                                                        ghế</label>
                                                    <input
                                                        type="number"
                                                        name="totalSeats"
                                                        id="totalSeats"
                                                        value={selectedShip?.totalSeats || ''}
                                                        onChange={(e) => setSelectedShip({
                                                            ...selectedShip,
                                                            totalSeats: e.target.value
                                                        })}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="status"
                                                           className="block text-sm font-medium text-gray-700">Trạng
                                                        thái</label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        value={editShipStatus}
                                                        onChange={(e) => setEditShipStatus(e.target.value)}
                                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    >
                                                        <option value="ACTIVE">Hoạt động</option>
                                                        <option value="INACTIVE">Không hoạt động</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleEditShip}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Lưu thay đổi
                                </button>
                                <button onClick={closeViewModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isAddModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Thêm tàu mới</h3>
                                        <div className="mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <label htmlFor="numberPlate"
                                                           className="block text-sm font-medium text-gray-700">Biển
                                                        số</label>
                                                    <input
                                                        type="text"
                                                        name="numberPlate"
                                                        id="numberPlate"
                                                        value={newShip.numberPlate}
                                                        onChange={handleChange}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="VD: VN-1234"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="createAt"
                                                           className="block text-sm font-medium text-gray-700">Ngày
                                                        nhập</label>
                                                    <input
                                                        type="date"
                                                        name="createAt"
                                                        id="createAt"
                                                        value={newShip.createAt}
                                                        onChange={handleChange}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                        placeholder="YYYY-MM-DD"
                                                    />
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="status"
                                                           className="block text-sm font-medium text-gray-700">Trạng
                                                        thái</label>
                                                    <select
                                                        id="status"
                                                        name="status"
                                                        value={newShip.status}
                                                        onChange={handleChange}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    >
                                                        <option value="ACTIVE">Kích hoạt</option>
                                                        <option value="INACTIVE">Không kích hoạt</option>
                                                    </select>
                                                </div>
                                                <div className="col-span-2">
                                                    <label htmlFor="totalSeats"
                                                           className="block text-sm font-medium text-gray-700">Tổng số
                                                        ghế</label>
                                                    <input
                                                        type="number"
                                                        name="totalSeats"
                                                        id="totalSeats"
                                                        value={newShip.totalSeats}
                                                        onChange={handleChange}
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleAddShip}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Thêm tàu
                                </button>
                                <button onClick={closeAddModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ShipList;
