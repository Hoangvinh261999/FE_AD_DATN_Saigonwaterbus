import { useEffect} from "react";
import ShipList from "./components/ShipList";
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
function ShipManagerment() {
        const dispatch = useDispatch()

        useEffect(() => {
        dispatch(setPageTitle({ title : "Tàu"}))
      }, [])

    return (
        <div className="container mx-auto p-4">
            <ShipList/>
        </div>
    );
}

export default ShipManagerment;

