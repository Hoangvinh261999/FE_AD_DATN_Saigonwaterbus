import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './UserTable.css';

const UserTable = ({ data, onDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = localStorage.getItem("token")
    const [selectedUser, setSelectedUser] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        username: '',
        role: 'USER',
        status: 'ACTIVE'
    });

    const openModal = (user) => {
        setSelectedUser(user);

        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser({
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phoneNumber: '',
            username: '',
            role: 'USER',
            status: 'ACTIVE'
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(selectedUser)
        try {
            const response = await axios.post(`http://localhost:8080/api/saigonwaterbus/admin/staff/update/${selectedUser.id}`, selectedUser,{
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                alert('Cập nhật nhân viên thành công');
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
            <table>
                <thead>
                <tr>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Số Điện Thoại</th>
                    <th>Quyền</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={index}>
                        <td onClick={() => openModal(user)}>{user.firstname || ''}</td>
                        <td onClick={() => openModal(user)}>{user.lastname || ''}</td>
                        <td onClick={() => openModal(user)}>{user.phoneNumber || ''}</td>
                        <td onClick={() => openModal(user)}>{getRole(user.role)}</td>
                        <td onClick={() => openModal(user)}>{getStatus(user.status)}</td>
                        <td>
                            <button className="delete" onClick={() => onDelete(user.id)}>Xóa</button>
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
                    <div>
                        <h2 className="modal-header">Chỉnh Sửa Thông Tin</h2>
                        <form onSubmit={handleSave}>
                            <label>
                                Họ:
                                <input
                                    type="text"
                                    name="firstname"
                                    value={selectedUser.firstname || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Tên:
                                <input
                                    type="text"
                                    name="lastname"
                                    value={selectedUser.lastname || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    name="email"
                                    value={selectedUser.email || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Số Điện Thoại:
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={selectedUser.phoneNumber || ''}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Tên Tài Khoản:
                                <input
                                    type="text"
                                    name="username"
                                    value={selectedUser.username || ''}
                                    onChange={handleChange}
                                    disabled
                                />
                            </label>
                            <label>
                                Quyền:
                                <select
                                    name="role"
                                    value={selectedUser.role || 'USER'}
                                    onChange={handleChange}
                                >

                                    <option value="ADMIN">Quản Trị</option>
                                    <option value="STAFF">Nhân Viên</option>
                                </select>
                            </label>
                            <label>
                                Trạng Thái:
                                <select
                                    name="status"
                                    value={selectedUser.status || 'ACTIVE'}
                                    onChange={handleChange}
                                >
                                    <option value="ACTIVE">Kích Hoạt</option>
                                    <option value="INACTIVE">Không Kích Hoạt</option>
                                </select>
                            </label>
                            <button type="submit" className='button-18'>Lưu</button>
                            <button onClick={closeModal} className='button-18'>Đóng</button>
                        </form>

                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserTable;
