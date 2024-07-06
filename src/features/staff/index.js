import StaffList from "./components/StaffList";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import './components/UserTable.css'
function Staff() {
    const token = localStorage.getItem("token");
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const getAdmin = async (page) => {
        const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/nhan-vien?page=${page}&size=7`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmployees(response.data.result.content);
        setTotalPages(response.data.result.totalPages);
        console.log(response.data.result.content);
    };

    const handleEdit = async (updatedUser) => {
        try {
            const formData = new FormData();
            formData.append('accountDTO', JSON.stringify(updatedUser));

            const response = await axios.post('http://localhost:8080/api/saigonwaterbus/admin/staff/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200 && response.data.code === 200) {
                setEmployees(employees.map(user => user.id === updatedUser.id ? response.data.result : user));
            } else {
                console.error('Failed to update user', response.data.message);
            }
        } catch (error) {
            console.error('There was an error updating the user!', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/saigonwaterbus/admin/staff/delete/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200 && response.data.code === 200) {

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

    useEffect(() => {
        getAdmin(page);
    }, [page]);

    return (
        <div className="container mx-auto px-4 py-6">
            <StaffList data={employees} onEdit={handleEdit} onDelete={handleDelete} />
            <a href="Nhan-vien/create" className="button-18" >
                Thêm Mới
            </a>
            <div className="pagination">
                <div className="pagination-buttons">
                    <button onClick={() => handlePageChange(0)} disabled={page === 0} className="flex">
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
                            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
                            </svg>
                    </button>
                    <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
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
                            <path d="M15 18l-6-6 6-6" />
                            </svg>
                    </button>
                    <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
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
                                <path d="M9 18l6-6-6-6" />
                                </svg>
                    </button>
                    <button onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1} className="flex">
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
                            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
                            </svg>

                    </button>
                </div>
                <span>Trang {page + 1} Trên {totalPages}</span>
            </div>
        </div>
    );
}

export default Staff;
