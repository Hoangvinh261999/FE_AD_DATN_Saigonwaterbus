import React, { useEffect, useState } from 'react';
import seatService from '../../service/seatService';
import { formatDate } from '../../utils/formatDate';
import Popup from '../../utils/chooseOption';
import { useDispatch } from "react-redux";
import { setPageTitle } from "../common/headerSlice";

const TicketManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Ghế tàu" }));
  }, []);

  const [seats, setSeats] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const seatsPerPage = 73;
  const [totalPages, setTotalPages] = useState(1);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null); // State to hold the selected seat for confirmation

  const handleConfirm = async () => {
    if (selectedSeat) {
      try {
        if(selectedSeat.status==='ACTIVE'){
          selectedSeat.status='INACTIVE'
                    selectedSeat.status='INACTIVE'

        }else{
                    selectedSeat.status='ACTIVE'

        }
        // Call the service to update seat status
        await seatService.capNhatGhe(selectedSeat);
      } catch (error) {
        console.error('Error toggling seat status:', error);
      } finally {
        setIsPopupVisible(false);
      }
    }
    console.log('Confirmed action');
  };

  const handleCancel = () => {
    setIsPopupVisible(false);
    console.log('Cancelled action');
  };

  const handlePopup = (seat) => {
    setSelectedSeat(seat); // Set the selected seat before showing the popup
    setIsPopupVisible(true);
  };

  const fetchSeats = async (page) => {
    try {
      const response = await seatService.dsGhe(page);
      setSeats(response.content);
      setTotalPages(response.totalPages);
      console.log(response.content)
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  useEffect(() => {
    fetchSeats(currentPage);
  }, [currentPage]);

  const handleToggleStatus = (seat) => {
    // Toggle the popup visibility and set the selected seat
    handlePopup(seat);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold mb-4">Quản lý ghế tàu</h1>
        {/* <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
          Tìm kiếm
        </button> */}
      </div>
      {isPopupVisible && (
        <Popup
          message="Xác nhận thay đổi trạng thái ghế?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-sky-400 text-center">
            <th className="py-2">STT</th>
            <th className="py-2">Tàu</th>
            <th className="py-2">Trạng thái</th>
            <th className="py-2">Tên ghế</th>
            <th className="py-2">Ngày tạo</th>
            <th className="py-2">Ngày chỉnh sửa</th>
            <th className="py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, index) => (
            <tr key={seat.id} className='text-center'>
              <td className="py-2 px-4 border">{index + 1 + currentPage * seatsPerPage}</td>
              <td className="py-2 px-4 border">{seat.ship_id}</td>
              <td className="py-2 px-4 border">{seat.status === 'ACTIVE' ? 'Đang hoạt động' : 'Bảo trì'}</td>
              <td className="py-2 px-4 border">{seat.seatName}</td>
              <td className="py-2 px-4 border">{formatDate(seat.createAt)}</td>
              <td className="py-2 px-4 border">{seat.updateAt !== null ? formatDate(seat.updateAt) : ''}</td>
              <td className="py-2 px-4 border">
                <label htmlFor={`toggle-${seat.id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      id={`toggle-${seat.id}`}
                      type="checkbox"
                      onClick={() => handlePopup(seat)}
                      className="sr-only"
                      checked={seat.status === 'ACTIVE'}
                      onChange={() => handleToggleStatus(seat)}
                    />
                    <div className={`w-10 h-4 rounded-full shadow-inner transition-colors ${seat.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div
                      className={`dot absolute w-6 h-6 bg-slate-200 rounded-full shadow -left-1 -top-1 transition-transform ${seat.status === 'ACTIVE' ? 'translate-x-full bg-green-500' : 'bg-red-500'}`}
                    ></div>
                  </div>
                  <div className="ml-3 font-medium">
                    {seat.status === 'ACTIVE' ? 'Bảo trì ghế' : 'Kích hoạt ghế'}
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
        >
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </button>
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <button
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
        >
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" height="1em" width="1em">
            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TicketManagement;
