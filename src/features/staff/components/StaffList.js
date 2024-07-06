// UserTable.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './UserTable.css';


const UserTable = ({ data, onEdit, onDelete }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const openModal = (user) => {
        setSelectedUser(user);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedUser(null);
    };

    const handleSave = () => {
        onEdit(selectedUser);
        closeModal();
    };
    const getStatus = (status) => {
        switch (status) {
            case "ACTIVE":
                return "kích hoạt";
            case "INACTIVE":
                return "chưa kích hoạt";
            case "DELETE":
                return "đã xóa";
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
                return "Khách hàng google";
            case "STAFF":
                return "nhân viên";
            default:
                return role;
        }
    };
    return (
        <div>
                    <h2 className="text-2xl font-bold mb-4">Danh sách nhân viên</h2>

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
                            <button className="delete" onClick={() => onDelete(user.id)}>Delete</button>
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
            >
                {selectedUser && (
                    <div>
                        <h2 className="modal-header">Edit User</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <label>
                                Họ:
                                <input
                                    type="text"
                                    value={selectedUser.firstname || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, firstname: e.target.value })}
                                />
                            </label>
                            <label>
                                Tên:
                                <input
                                    type="text"
                                    value={selectedUser.lastname || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, lastname: e.target.value })}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    value={selectedUser.email}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                                />
                            </label>
                            <label>
                                Số điện thoại:
                                <input
                                    type="text"
                                    value={selectedUser.phoneNumber || ''}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, phoneNumber: e.target.value })}
                                />
                            </label>
                            <label>
                                Tài khoản:
                                <input
                                    type="text"
                                    value={selectedUser.username}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                                />
                            </label>
                            <label>
                                Vai trò:
                                <input
                                    type="text"
                                    value={selectedUser.role}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                />
                            </label>
                            <label>
                                Trạng thái:
                                <input
                                    type="text"
                                    value={selectedUser.status}
                                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                />
                            </label>
                            <button type="submit" className="save">Save</button>
                            <button type="button" onClick={closeModal} className="cancel">Cancel</button>
                        </form>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserTable;
