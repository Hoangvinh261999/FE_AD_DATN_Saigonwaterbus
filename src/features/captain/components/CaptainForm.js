import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CaptainForm.css';
import {useDispatch} from "react-redux";
import {setPageTitle} from "../../common/headerSlice";

const AddCaptainForm = () => {
    const token = localStorage.getItem("token");
    const [ships, setShips] = useState([]);
    const dispatch = useDispatch();

    useState(() => {
        dispatch(setPageTitle({ title: 'Thêm thuyền trưởng' }));
    }, []);
    const getShip = async () => {
        const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/tau`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setShips(response.data.content);
        console.log(response.data.content)
    };

    useEffect(() => {
        getShip();
    }, []);

    const [captainData, setCaptainData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        address: '',
        shipLicense: '',
        status: 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: null,
        deletedAt: null,
        shipId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCaptainData({
            ...captainData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/saigonwaterbus/admin/captains', captainData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert('Thêm thành công');
                console.log('Captain added:', response.data);
                window.location.href="http://localhost:3000/admin/thuyen-truong"
            } else {
                alert('Thêm thất bại');
                console.error('Unexpected response code:', response.status);
            }
        } catch (error) {
            alert('Thêm thất bại');
            console.error('Error adding captain:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="add-captain-form">
            <div className="form-row">
                <div className="form-column">
                    <label>
                        Họ:
                        <input
                            type="text"
                            name="firstname"
                            value={captainData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Số điện thoại:
                        <input
                            type="text"
                            name="phoneNumber"
                            value={captainData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Giấy phép tàu:
                        <input
                            type="text"
                            name="shipLicense"
                            value={captainData.shipLicense}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-column">
                    <label>
                        Tên:
                        <input
                            type="text"
                            name="lastname"
                            value={captainData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Địa chỉ:
                        <input
                            type="text"
                            name="address"
                            value={captainData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Trạng thái:
                        <select
                            name="status"
                            value={captainData.status}
                            onChange={handleChange}
                        >
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Ngưng hoạt động</option>
                            <option value="SUSPENDED">Tạm ngừng</option>
                        </select>
                    </label>
                    <label>
                        Tàu:
                        <select
                            name="shipId"
                            value={captainData.shipId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn tàu</option>
                            {ships.map((ship) => (
                                <option key={ship.id} value={ship.id}>{ship.id}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <button type="submit" className="button-74">Thêm Thuyền Trưởng</button>
            <a className="button-74" href="http://localhost:3000/admin/thuyen-truong">Quay lại</a>
        </form>
    );
};

export default AddCaptainForm;
