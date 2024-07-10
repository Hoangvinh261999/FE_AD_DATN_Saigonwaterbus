import React, { useEffect, useState } from "react";
import axios from "axios";
import TripList from "./component/TripList";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../common/headerSlice";
import './styleButtonTrip.css';

function Trip() {
   const [trips, setTrips] = useState([]);
   const [message, setMessage] = useState("");
   const [searchDate, setSearchDate] = useState("");
   const [error, setError] = useState(""); // Trạng thái lỗi
   const token = localStorage.getItem("token");
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setPageTitle({ title: "Danh sách chuyến đi" }));
      fetchTrips(); // Fetch trips on component mount
   }, []);

   const fetchTrips = async () => {
      try {
         const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/trips/${getCurrentDate()}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response.data.result.content.length === 0) {
            setMessage("Tạm thời chưa có chuyến nào trong ngày hôm nay.");
            setTrips([]);
         } else {
            setMessage("");
            setTrips(response.data.result.content);
         }
         console.log(response.data.result.content);
      } catch (error) {
         console.error("Error fetching trips:", error);
         setMessage("Đã xảy ra lỗi khi tải dữ liệu.");
      }
   };

   const SearchTrip = async (date) => {
      try {
         const response = await axios.get(`http://localhost:8080/api/saigonwaterbus/admin/trips/${date}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response.data.result.content.length === 0) {
            setMessage(`Tạm thời chưa có chuyến nào trong ngày ${date}.`);
            setTrips([]);
         } else {
            setMessage("");
            setTrips(response.data.result.content);
         }
         console.log(response.data.result.content);
      } catch (error) {
         console.error("Error fetching trips:", error);
         setMessage("Đã xảy ra lỗi khi tải dữ liệu.");
      }
   };

   const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      if (month < 10) {
         month = `0${month}`;
      }
      if (day < 10) {
         day = `0${day}`;
      }

      return `${year}-${month}-${day}`;
   };

   const handleSearch = (e) => {
      e.preventDefault();
      const currentDate = new Date(getCurrentDate());
      const selectedDate = new Date(searchDate);

      if (selectedDate < currentDate) {
         setError("Ngày tìm kiếm không được nhỏ hơn ngày hiện tại.");
      } else {
         setError("");
         SearchTrip(searchDate);
      }
   };

   return (
       <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Danh sách chuyến đi</h1>
          <form onSubmit={handleSearch} className="mb-4">
             <label htmlFor="searchDate" className="mr-2">Tìm chuyến theo ngày:</label>
             <input
                 type="date"
                 id="searchDate"
                 value={searchDate}
                 onChange={(e) => setSearchDate(e.target.value)}
                 min={getCurrentDate()} // Khóa chọn ngày quá khứ
                 className="p-2 border rounded"
             />
             <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Tìm kiếm</button>
          </form>
          {error && <p className="text-red-500">{error}</p>} {/* Hiển thị lỗi */}
          {message && <p className="text-red-500">{message}</p>}
          <TripList trip={trips} />
          <a href="/admin/create/trip">
             <button className="button-18" role="button">Thêm chuyến</button>
          </a>
       </div>
   );
}

export default Trip;
