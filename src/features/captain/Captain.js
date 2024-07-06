import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// import TitleCard from "../../components/Cards/TitleCard"
import { setPageTitle} from "../common/headerSlice"



const captain = [
    { id: 1, lastName: 'Nguyen', firstName: 'Van A', username: 'nguyenvana', password: 'password', phone: '0123456789', role: 'Captain' },
    { id: 2, lastName: 'Tran', firstName: 'Thi B', username: 'tranthib', password: 'password', phone: '0987654321', role: 'Deckhand' } // Thêm các nhân viên khác ở đây];
]
function Captain(){

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPageTitle({ title : "Thuyền Trưởng"}))
      }, [])

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Danh Sách Thuyền Trưởng</h2>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Họ</th>
                    <th className="py-2">Tên</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Số Điện Thoại</th>
                    <th className="py-2">Role</th>
                    <th className="py-2">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {captain.map((captain) => (
                    <tr key={captain.id}>
                        <td className="border px-4 py-2">{captain.id}</td>
                        <td className="border px-4 py-2">{captain.lastName}</td>
                        <td className="border px-4 py-2">{captain.firstName}</td>
                        <td className="border px-4 py-2">{captain.username}</td>
                        <td className="border px-4 py-2">{captain.phone}</td>
                        <td className="border px-4 py-2">{captain.role}</td>
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                                Sửa
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2">
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className='divider'></div>

            <a className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" href='staff/create'> Thêm</a>
        </div>
    );
}

export default Captain;