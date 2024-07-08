import { useEffect, useState } from "react";
import axios from "axios";
import TripList from "./component/TripList";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../common/headerSlice";

function Trip() {
   const [trips, setTrips] = useState([]);
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
         setTrips(response.data.result.content);
         console.log(response.data.result.content);
      } catch (error) {
         console.error("Error fetching trips:", error);
      }
   };
   // const getCurrentDate= "2024-05-28"

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

   return (
       <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Danh sách chuyến đi</h1>
          <TripList trip={trips} />
          <a href="/admin/create/trip">
             <button className="button-18" role="button">Thêm chuyến</button>
          </a>
       </div>
   );
}

export default Trip;
