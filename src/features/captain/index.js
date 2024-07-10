import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CaptainList from './components/CaptainList';
import './CaptainIndex.css';
import {useDispatch} from "react-redux";
import {setPageTitle} from "../common/headerSlice";

const CaptainIndex = () => {
    const [captains, setCaptains] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState('');
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thuyền trưởng"}))
    }, [])
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchCaptains(currentPage, pageSize, searchKeyword);
        }, 300); // Thời gian chờ là 300ms

        return () => clearTimeout(delayDebounceFn); // Xóa timeout cũ khi searchKeyword thay đổi
    }, [currentPage, pageSize, searchKeyword]);

    const fetchCaptains = async (page, size, keyword) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/captains`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    page: page,
                    size: size,
                    keyword: keyword
                }
            });
            if (response.status === 200) {
                setCaptains(response.data.result.content);
                setTotalPages(response.data.result.totalPages);
            } else {
                alert('Không thể lấy danh sách thuyền trưởng');
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thuyền trưởng!', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-4">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        className="py-2 px-3 outline-none w-full"
                    />
                </div>
                <a href="thuyen-truong/tao" className="button-24">Thêm Mới</a>
            </div>
            <CaptainList captains={captains} fetchCaptains={fetchCaptains} />
            <div className="flex justify-between items-center mt-4">
                <div className="pagination-buttons">
                    <button
                        onClick={() => handlePageChange(0)}
                        disabled={currentPage === 0}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
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
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
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
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage + 1 === totalPages}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
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
                        onClick={() => handlePageChange(totalPages - 1)}
                        disabled={currentPage + 1 === totalPages}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
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
                <div className="pagination-info">
                    <span>Trang {currentPage + 1} của {totalPages}</span>
                </div>
            </div>
        </div>
    );
};

export default CaptainIndex;
