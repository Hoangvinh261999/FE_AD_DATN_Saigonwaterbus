import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

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
            const response = await axios.put(`http://localhost:8080/api/saigonwaterbus/admin/captain/update`, editedCaptain, {
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


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/captain/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log('Captain deleted:', response.data);
            fetchCaptains();
            closeModal();
            window.alert("Xoá thành công!")
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
                return "Đang làm việc";
            case "INACTIVE":
                return "Ngưng làm việc";
            case "DELETE":
                return "Đã xóa";
            default:
                return status;
        }
    };

    return (
        <div className="">
<table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden ">
    <thead className="bg-sky-500">
        <tr>
            <th className="border text-left py-2 px-4">Họ</th>
            <th className="border text-left py-2 px-4">Tên</th>
            <th className="border text-left py-2 px-4">Số điện thoại</th>
            <th className="border text-left py-2 px-4">Địa chỉ</th>
            <th className="border text-left py-2 px-4">Giấy phép tàu</th>
            <th className="border text-left py-2 px-4">Trạng thái</th>
            <th className="border text-left py-2 px-4">ID tàu</th>
            <th className="border text-left py-2 px-4">Ngày tạo</th>
                        <th className="border text-left py-2 px-4">Tuỳ chọn</th>

        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {captains.map((captain, index) => (
            <tr key={index}  className="cursor-pointer hover:bg-gray-100">
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.firstname}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.lastname}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.phoneNumber}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.address}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.shipLicense}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{getStatus(captain.status)}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{captain.shipId}</td>
                <td className="border py-2 px-4" onClick={() => handleRowClick(captain)}>{new Date(captain.createAt).toLocaleDateString()}</td>
                <td className="border py-2 px-4">
                            <button onClick={() => handleDelete(captain.id)}
                                    className="px-4 py-2 bg-red-800 text-white rounded-md cursor-pointer text-sm mr-2">Xóa
                            </button>
                </td>
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
                   <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-center">Chỉnh sửa thông tin thuyền trưởng</h2>
    <form onSubmit={handleUpdate} className="space-y-4">
        <div>
            <label className="block text-sm font-bold text-gray-700">
                Họ:
                <input
                    type="text"
                    name="firstname"
                    value={editedCaptain.firstname}
                    onChange={handleEditChange}
                    className="mt-1 block w-full p-2 border font-normal border-gray-300 rounded-md outline-none"
                />
            </label>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700 ">
                Tên:
                <input
                    type="text"
                    name="lastname"
                    value={editedCaptain.lastname}
                    onChange={handleEditChange}
                    className="mt-1 block w-full font-normal p-2 border border-gray-300 rounded-md outline-none"
                />
            </label>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">
                Số điện thoại:
                <input
                    type="text"
                    name="phoneNumber"
                    value={editedCaptain.phoneNumber}
                    onChange={handleEditChange}
                    className="mt-1 block w-full p-2 border font-normal border-gray-300 rounded-md outline-none"
                />
            </label>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">
                Địa chỉ:
                <input
                    type="text"
                    name="address"
                    value={editedCaptain.address}
                    onChange={handleEditChange}
                    className="mt-1 block w-full p-2 border font-normal border-gray-300 rounded-md outline-none"
                />
            </label>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">
                Giấy phép tàu:
                <input
                    type="text"
                    name="shipLicense"
                    value={editedCaptain.shipLicense}
                    onChange={handleEditChange}
                    className="mt-1 block w-full p-2 border font-normal border-gray-300 rounded-md outline-none"
                />
            </label>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">
                Trạng thái:
                <select
                    name="status"
                    value={editedCaptain.status}
                    onChange={handleEditChange}
                    className="mt-1 block w-full p-2 border font-normal border-gray-300 rounded-md outline-none"
                >
                    <option value="ACTIVE">Đang làm việc</option>
                    <option value="INACTIVE">Ngưng làm việc</option>
                </select>
            </label>
        </div>
        <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm">Lưu</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 text-sm">Đóng</button>
        </div>
    </form>
</div>

                )}
            </Modal>
        </div>
    );
};

export default CaptainList;
