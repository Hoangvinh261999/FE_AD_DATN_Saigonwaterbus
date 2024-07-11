import React, { useEffect, useState } from "react";
import axios from "axios";
import TripList from "./component/TripList";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../common/headerSlice";
import '../../app/css/indexcss.css';

function Trip() {
   const [trips, setTrips] = useState([]);
   const [message, setMessage] = useState("");
   const [searchDate, setSearchDate] = useState("");
   const [error, setError] = useState(""); // Trạng thái lỗi
   const token = localStorage.getItem("token");
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setPageTitle({ title: "Danh sách chuyến tàu" }));
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
       <div className="container mx-auto my-4">
                 {error && <p className="text-red-500 text-center">{error}</p>}
          {message && <p className="text-red-500">{message}</p>}
                  <div className="flex items-center justify-between p-4 mb-2">
                     <form onSubmit={handleSearch} className="flex items-center  w-full">
                        <label htmlFor="searchDate" className="text-gray-700 mr-2  text-center font-bold">Tìm chuyến theo ngày:</label>
                        <input
                              type="date"
                              id="searchDate"
                              value={searchDate}
                              onChange={(e) => setSearchDate(e.target.value)}
                              min={getCurrentDate()}
                              className="px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <button type="submit" className="ml-2  px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                              Tìm kiếm
                        </button>
                     </form>
                     <a
                        href="/admin/create/trip"
                        className=" px-4 py-2 w-2/12 font-bold bg-blue-500  text-center text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                     >
                       <label> Thêm chuyến</label>
                     </a>
                  </div>

          <TripList trip={trips} />


       </div>
   );
}

export default Trip;
