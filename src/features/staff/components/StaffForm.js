import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeeForm = () => {
    const token = localStorage.getItem("token");
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        username: '',
        password: '',
        role: 'USER',
        status: 'ACTIVE',
        createAt: '',
        updateAt: '',
        deleteAt: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/saigonwaterbus/admin/staff/create", formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200 && response.data.code === 200) {
                alert('Thêm nhân viên thành công');
                // Reset form
                setFormData({
                    id: '',
                    firstname: '',
                    lastname: '',
                    email: '',
                    phoneNumber: '',
                    username: '',
                    password: '',
                    role: 'USER',
                    status: 'ACTIVE',
                    createAt: '',
                    updateAt: '',
                    deleteAt: ''
                });
            } else {
                alert('Thêm nhân viên thất bại');
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi thêm nhân viên!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">Tên</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="Tên" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Họ</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Họ" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">Số điện thoại</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Số điện thoại" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Tên đăng nhập</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Tên đăng nhập" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">Vai trò</label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="STAFF">STAFF</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Trạng thái</label>
                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="status" value={formData.status} onChange={handleChange} required>
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Thêm nhân viên
                </button>
            </div>
        </form>
    );
};

export default AddEmployeeForm;
