import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../../app/css/indexcss.css';

import PopupDone from '../../../utils/popup/popupDone';
const UserTable = ({ data, onDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = localStorage.getItem("token")
    const [showPopup, setShowPopup] = useState(false);

        const togglePopup = () => {
            setShowPopup(!showPopup);
        };

    const [selectedUser, setSelectedUser] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        username: '',
        role: '',
        status: ''
    });

    const openModal = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
                console.log(modalIsOpen)

    };

    const closeModal = () => {
        setModalIsOpen(!modalIsOpen);
        setSelectedUser({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            username: '',
            role: '',
            status: ''
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8080/api/saigonwaterbus/admin/staff/update/${selectedUser.id}`, selectedUser,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                // alert('Cập nhật nhân viên thành công');
                togglePopup();
                // Refresh data or update state after successful edit
                window.location.href = "http://localhost:3000/admin/Nhan-vien"
            } else {
                alert('Cập nhật nhân viên thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật nhân viên!', error);
        }
        closeModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
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

    const getRole = (role) => {
        switch (role) {
            case "USER":
                return "Khách hàng";
            case "ADMIN":
                return "Quản trị viên";
            case "GUEST":
                return "Khách hàng Google";
            case "STAFF":
                return "Nhân viên";
            default:
                return role;
        }
    };

    return (
        <div>
{showPopup && (
        <PopupDone
          message="Thêm nhân viên thành công"
          show={showPopup}
          onClose={togglePopup}
        />
      )}
<table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden border border-gray-300">
    <thead className="bg-gray-50 border-b border-gray-300">
        <tr className='bg-sky-500 border-gray-300'>
            <th className="py-3 px-6 text-left border-r border-gray-300">Stt</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Họ</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Tên</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Số Điện Thoại</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Quyền</th>
            <th className="py-3 px-6 text-left border-r border-gray-300">Trạng Thái</th>
            <th className="py-3 px-6 text-left">Hành Động</th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
        {data.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
                <td className="py-4 px-6 text-center border-r border-gray-300">{index + 1}</td>
                <td className="py-4 px-6 cursor-pointer hover:text-blue-500 border-r border-gray-300" onClick={() => openModal(user)}>{user.firstname || ''}</td>
                <td className="py-4 px-6 cursor-pointer hover:text-blue-500 border-r border-gray-300" onClick={() => openModal(user)}>{user.lastname || ''}</td>
                <td className="py-4 px-6 cursor-pointer hover:text-blue-500 border-r border-gray-300" onClick={() => openModal(user)}>{user.phoneNumber || ''}</td>
                <td className="py-4 px-6 cursor-pointer hover:text-blue-500 border-r border-gray-300" onClick={() => openModal(user)}>{getRole(user.role)}</td>
                <td className="py-4 px-6 cursor-pointer hover:text-blue-500 border-r border-gray-300" onClick={() => openModal(user)}>{getStatus(user.status)}</td>
                <td className="py-4 px-6">
                    <button className="text-red-500 hover:text-red-700 focus:outline-none" onClick={() => onDelete(user.id)}>Xóa</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit User"
                overlayClassName="Modal__Overlay"
                className="Modal__Content"
                appElement={document.getElementById('root')}
            >
                {selectedUser && (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-xl font-bold mb-4 text-center">Chỉnh Sửa Thông Tin Nhân viên</h2>
    <form onSubmit={handleSave} className="space-y-4">
        <div>
            <label className="block text-sm font-bold text-gray-700">Họ:</label>
            <input
                type="text"
                name="firstname"
                value={selectedUser.firstname || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Tên:</label>
            <input
                type="text"
                name="lastname"
                value={selectedUser.lastname || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Email:</label>
            <input
                type="text"
                name="email"
                value={selectedUser.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Số Điện Thoại:</label>
            <input
                type="text"
                name="phoneNumber"
                value={selectedUser.phoneNumber || ''}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Tên Tài Khoản:</label>
            <input
                type="text"
                name="username"
                value={selectedUser.username || ''}
                onChange={handleChange}
                disabled
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            />
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Quyền:</label>
            <select
                name="role"
                value={selectedUser.role || 'USER'}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="ADMIN">Quản Trị</option>
                <option value="STAFF">Nhân Viên</option>
            </select>
        </div>
        <div>
            <label className="block text-sm font-bold text-gray-700">Trạng Thái:</label>
            <select
                name="status"
                value={selectedUser.status || 'ACTIVE'}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="ACTIVE">Hoạt động</option>
                <option value="INACTIVE">Không hoạt động</option>
            </select>
        </div>
        <div className="flex space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Lưu</button>
            <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Đóng</button>
        </div>
    </form>
</div>

                )}
            </Modal>
        </div>
    );
};

export default UserTable;