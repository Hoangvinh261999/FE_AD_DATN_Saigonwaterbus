import React, { useEffect, useState } from "react";
import axios from "axios";
// import './components/UserTable.css';
import UserTable from "./components/StaffList";
import '../../app/css/indexcss.css';

function Staff() {
    const token = localStorage.getItem("token");
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const getAdmin = async (page) => {
        const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/staff1?page=${page}&size=10`, {
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
       <div className="my-4">
                   <div className="flex items-center justify-between">
                <div className="flex items-center  w-3/5 p-2">
                    <span className="text-gray-700 mr-2 w-1/5 text-center font-bold">Tìm kiếm</span>
                    <input
                        type="text"
                        placeholder="Nhập từ khoá trong họ tên nhân viên"
                        value={searchQuery}
                                onChange={handleSearchChange}
                        className="px-3 py-2 text-gray-700 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                </div>
                <a
                    href="thuyen-truong/tao"
                    className="ml-2 px-4 py-1 font-bold bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                    Thêm Mới
                </a>
            </div>

    <UserTable data={filteredEmployees} onDelete={handleDelete} />

    <div className="flex   mt-4 justify-center">
                <div className="pagination-buttons space-x-5">
                    <button
                        onClick={() => handlePageChange(0)}
                        disabled={page=== 0}
                        className="px-3 py-2 bg-sky-500 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                        >
                            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 0}
                        className="px-3 py-2 bg-sky-500 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                        >
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    <span>{page+1}/{totalPages}</span>
                
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page + 1 === totalPages}
                        className="px-3 py-2 bg-sky-500 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                        >
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                            disabled={page + 1 === totalPages}
                        className="px-3 py-2 bg-sky-500 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                    >
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                        >
                            <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
                        </svg>
                    </button>
                </div>
                {/* <div className="pagination-info">
                    <span>Trang {currentPage + 1} của {totalPages}</span>
                </div> */}
            </div>
</div>

    );
}

export default Staff;
