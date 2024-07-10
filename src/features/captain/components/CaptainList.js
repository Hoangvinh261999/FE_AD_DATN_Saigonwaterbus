import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './CaptainList.css';

const CaptainList = ({ captains, fetchCaptains }) => {
    const token = localStorage.getItem("token")
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCaptain, setSelectedCaptain] = useState(null);
    const [editedCaptain, setEditedCaptain] = useState(null);

    const handleRowClick = (captain) => {
        setSelectedCaptain(captain);
        setEditedCaptain({ ...captain });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCaptain(null);
        setEditedCaptain(null);
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/captains/${editedCaptain.id}`, editedCaptain, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert('Cập nhật thành công');
                console.log('Captain updated:', response.data);
                fetchCaptains();
                closeModal();
            } else {
                alert('Cập nhật thất bại');
                console.error('Unexpected response code:', response.status);
            }
        } catch (error) {
            alert('Cập nhật thất bại');
            console.error('Error updating captain:', error);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/captains/${selectedCaptain.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log('Captain deleted:', response.data);
            fetchCaptains();
            closeModal();
        } catch (error) {
            console.error('Error deleting captain:', error);
        }
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedCaptain({
            ...editedCaptain,
            [name]: value
        });
    };
    const getStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return "Kích hoạt";
            case "INACTIVE":
                return "Chưa kích hoạt";
            case "DELETE":
                return "Đã xóa";
            default:
                return status;
        }
    };

    return (
        <div className="table-container">
            <table className="captain-table">
                <thead>
                <tr className=' text-center'>
                    <th className=" border  text-left">Họ</th>
                    <th className=" border  text-left">Tên</th>
                    <th className=" border  text-left">Số điện thoại</th>
                    <th className=" border  text-left">Địa chỉ</th>
                    <th className=" border  text-left">Giấy phép tàu</th>
                    <th className=" border  text-left">Trạng thái</th>
                    <th className=" border  text-left">ID tàu</th>
                    <th className=" border  text-left">Ngày tạo</th>
                </tr>
                </thead>
                <tbody>
                {captains.map((captain, index) => (
                    <tr key={index} onClick={() => handleRowClick(captain)}>
                        <td className=" border  text-left">{captain.firstname}</td>
                        <td className=" border  text-left">{captain.lastname}</td>
                        <td className=" border  text-left">{captain.phoneNumber}</td>
                        <td className=" border  text-left">{captain.address}</td>
                        <td className=" border  text-left">{captain.shipLicense}</td>
                        <td className=" border  text-left">{getStatus(captain.status)}</td>
                        <td className=" border  text-left">{captain.shipId}</td>
                        <td className=" border  text-left">{new Date(captain.createdAt).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Captain"
                overlayClassName="Modal__Overlay"
                className="Modal__Content"
  style={{ zIndex: 100 }}
                
            >
                {editedCaptain && (
                    <div>
                        <h2>Chỉnh sửa thông tin thuyền trưởng</h2>
                        <label className="block mb-2">
                            Họ:
                            <input
                                type="text"
                                name="firstname"
                                value={editedCaptain.firstname}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            />
                        </label>
                        <br />
                        <label className="block mb-2">
                            Tên:
                            <input
                                type="text"
                                name="lastname"
                                value={editedCaptain.lastname}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            />
                        </label>
                        <br />
                        <label className="block mb-2">
                            Số điện thoại:
                            <input
                                type="text"
                                name="phoneNumber"
                                value={editedCaptain.phoneNumber}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            />
                        </label>
                        <br />
                        <label className="block mb-2">
                            Địa chỉ:
                            <input
                                type="text"
                                name="address"
                                value={editedCaptain.address}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            />
                        </label>
                        <br />
                        <label className="block mb-2">
                            Giấy phép tàu:
                            <input
                                type="text"
                                name="shipLicense"
                                value={editedCaptain.shipLicense}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            />
                        </label>
                        <br />
                        <label className="block mb-2">
                            Trạng thái:
                            <select
                                name="status"
                                value={editedCaptain.status}
                                onChange={handleEditChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                            >
                                <option value="ACTIVE">Kích hoạt</option>
                                <option value="INACTIVE">Không kích hoạt</option>
                                {/*<option value="SUSPENDED">Suspended</option>*/}
                            </select>
                        </label>
                        <br />
                        <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer text-sm mr-2">Lưu</button>
                        <button onClick={handleDelete} className="px-4 py-2 bg-red-800 text-white rounded-md cursor-pointer text-sm mr-2">Xóa</button>
                        <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md cursor-pointer text-sm">Đóng</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CaptainList;
