import {useEffect, useState} from "react";
import axios from "axios";
import TripList from "./component/TripList";
import {useDispatch} from "react-redux";
import {setPageTitle} from "../common/headerSlice";
import './component/styleButtonTrip.css'
function Trip() {
   const [Trips, setTrip] = useState([])
   const token = localStorage.getItem("token")
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(setPageTitle({ title : "Chuyến tàu"}))
   }, [])

   const getTrip = async ()=>{
      const response  = await axios.get("http://localhost:8080/api/saigonwaterbus/admin/trip",{
         headers:{
            Authorization: `Bearer ${token}`
         }
      })
      setTrip(response.data.result)
   }
   useEffect(() => {
      getTrip();
   }, []);
   return(
       <>
          <TripList trip={Trips}></TripList>
          <a href='/admin/create/trip'>
             <button className="button-18" role="button">Thêm chuyến</button>
          </a>
       </>

   )
}

export default Trip