import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dashboard from '../../features/dashboard/index'

const InternalPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Thống kê"}))
    }, [dispatch])

    return(
        <Dashboard/>
    )
}

export default InternalPage;