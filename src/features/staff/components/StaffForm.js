import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../common/headerSlice';
import './style.css';

const AddCaptainForm = () => {
    const dispatch = useDispatch();

    useState(() => {
        dispatch(setPageTitle({ title: 'Thêm nhân viên' }));
    }, []);

    const token = localStorage.getItem('token');

    const [captainData, setCaptainData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        username: '',
        role: 'ADMIN', // Mặc định là USER
        status: 'ACTIVE', // Mặc định là ACTIVE
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: null,
        deletedAt: null,
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const clearError = () => {
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCaptainData({
            ...captainData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/saigonwaterbus/admin/staff/save', captainData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Thêm nhân viên thành công:', response.data);
            setSuccessMessage('Thêm nhân viên thành công!');
            setError(null);
            setCaptainData({
                firstname: '',
                lastname: '',
                email: '',
                phoneNumber: '',
                username: '',
                role: 'ADMIN', // Reset lại role về USER sau khi thêm thành công
                status: 'ACTIVE', // Reset lại status về ACTIVE sau khi thêm thành công
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: null,
                deletedAt: null,
            });
        } catch (error) {
            console.error('Lỗi khi thêm nhân viên:', error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Đã xảy ra lỗi khi thêm nhân viên.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="alert alert-error">
                    <strong className="font-bold">Lỗi!</strong>
                    <span className="block sm:inline">{error}</span>
                    <svg onClick={clearError} className="fill-current h-6 w-6 text-red-500" role="button"
                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                        <path
                            fillRule="evenodd"
                            d="M14.348 14.849a.5.5 0 0 1-.707 0L10 10.707l-3.646 3.646a.5.5 0 0 1-.708-.708L9.293 10 5.646 6.354a.5.5 0 0 1 .708-.708L10 9.293l3.646-3.646a.5.5 0 0 1 .708.708L10.707 10l3.647 3.646a.5.5 0 0 1 0 .708z"
                        />
                    </svg>
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success">
                    <strong className="font-bold">Thành công!</strong>
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-1">
                <div className="mb-4">
                    <label htmlFor="firstname">Họ:</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={captainData.firstname}
                        onChange={handleChange}
                        required
                        placeholder="Nhập họ của nhân viên"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastname">Tên:</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={captainData.lastname}
                        onChange={handleChange}
                        required
                        placeholder="Nhập tên của nhân viên"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={captainData.email}
                        onChange={handleChange}
                        required
                        placeholder="Nhập email của nhân viên"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber">Số điện thoại:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={captainData.phoneNumber}
                        onChange={handleChange}
                        required
                        placeholder="Nhập số điện thoại của nhân viên"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={captainData.username}
                        onChange={handleChange}
                        required
                        placeholder="Nhập tên đăng nhập của nhân viên"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="role">Vai trò:</label>
                    <select
                        name="role"
                        id="role"
                        value={captainData.role}
                        onChange={handleChange}
                    >
                        <option value="ADMIN">Quản Trị Viên</option>
                        <option value="STAFF">Nhân Viên</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="status">Trạng thái:</label>
                    <select
                        name="status"
                        id="status"
                        value={captainData.status}
                        onChange={handleChange}
                    >
                        <option value="ACTIVE">Kích Hoạt</option>
                        <option value="INACTIVE">Ngưng Kích Hoạt</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Thêm nhân viên
                </button>
            </div>
            <a href="http://localhost:3000/admin/Nhan-vien" type="button"
               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-center">
            Trở về
            </a>
        </form>
    );
};

export default AddCaptainForm;
