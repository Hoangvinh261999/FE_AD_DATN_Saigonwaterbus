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
        <>
            <ShipList/>
        </>
    );
}

export default ShipManagerment;

