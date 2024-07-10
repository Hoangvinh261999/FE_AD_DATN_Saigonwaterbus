import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import './components/UserTable.css';
import UserTable from "./components/StaffList";

function Staff() {
    const token = localStorage.getItem("token");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const getAdmin = async (page) => {
        const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/staffs?page=${page}&size=7`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmployees(response.data.result.content);
        setTotalPages(response.data.result.totalPages);
    };

    const handleEdit = async (updatedUser) => {
        console.log(updatedUser)
        try {
            const response = await axios.post("http://localhost:8080/api/saigonwaterbus/admin/staff/save", updatedUser, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200 && response.data.code === 200) {
                alert("Sửa thành công");
            } else {
                alert("Sửa thất bại");
            }
        } catch (error) {
            console.error('Có lỗi xảy ra khi sửa nhân viên!', error);
        }
    };
    // const handleEdit = async (updatedUser) => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/api/saigonwaterbus/admin/staff/create', updatedUser, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //         });
    //
    //         if (response.status === 200 && response.data.code === 200) {
    //             setEmployees(employees.map(user => user.id === updatedUser.id ? response.data.result : user));
    //             setFilteredEmployees(filteredEmployees.map(user => user.id === updatedUser.id ? response.data.result : user));
    //         } else {
    //             console.error('Failed to update user', response.data.message);
    //         }
    //     } catch (error) {
    //         console.error('There was an error updating the user!', error);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/staff/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200 && response.data.code === 200) {
                setEmployees(employees.filter(user => user.id !== id));
                setFilteredEmployees(filteredEmployees.filter(user => user.id !== id));
            } else {
                console.error('Failed to delete user', response.data.message);
            }
        } catch (error) {
            console.error('There was an error deleting the user!', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        getAdmin(newPage);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterEmployees(event.target.value);
    };

    const filterEmployees = (query) => {
        const filtered = employees.filter(employee => {
            const name = employee.firstname ? employee.firstname.toLowerCase() : '';
            const lastName = employee.lastname ? employee.lastname.toLowerCase() : '';
            return name.includes(query.toLowerCase()) || lastName.includes(query.toLowerCase());
        });
        setFilteredEmployees(filtered);
    };

    useEffect(() => {
        getAdmin(page);
    }, [page]);

    useEffect(() => {
        filterEmployees(searchQuery);
    }, [employees]);

    return (
        <div>
            <div className='hello'>
                <input
                    type="text"
                    placeholder="Tìm kiếm nhân viên"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                <a href="Nhan-vien/create" className="button-18">
                    Thêm Mới
                </a>
            </div>

            <UserTable data={filteredEmployees} onDelete={handleDelete}/>

            <div className="pagination">
                <div className="pagination-buttons">
                    <button onClick={() => handlePageChange(0)} disabled={page === 0} className="flex">
                        <ChevronLeftIcon className="h-5 w-5"/><ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0} className="flex">
                        <ChevronLeftIcon className="h-5 w-5"/>
                    </button>
                    <span>Page {page + 1} of {totalPages}</span>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}
                            className="flex">
                        <ChevronRightIcon className="h-5 w-5"/>
                    </button>
                    <button onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}
                            className="flex">
                        <ChevronRightIcon className="h-5 w-5"/><ChevronRightIcon className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Staff;