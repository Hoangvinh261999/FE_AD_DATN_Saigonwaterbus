import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Subtitle from '../../../components/Typography/Subtitle'
import { setPageTitle } from '../../common/headerSlice'

function GettingStartedContent(){

    const dispatch = useDispatch()

    const employees = [
        { id: 1, lastName: 'Nguyen', firstName: 'Van A', username: 'nguyenvana', password: 'password', phone: '0123456789', role: 'Captain' },
        { id: 2, lastName: 'Tran', firstName: 'Thi B', username: 'tranthib', password: 'password', phone: '0987654321', role: 'Deckhand' } // Thêm các nhân viên khác ở đây];
    ]
    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Danh Sách Nhân Viên</h2>
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
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td className="border px-4 py-2">{employee.id}</td>
                        <td className="border px-4 py-2">{employee.lastName}</td>
                        <td className="border px-4 py-2">{employee.firstName}</td>
                        <td className="border px-4 py-2">{employee.username}</td>
                        <td className="border px-4 py-2">{employee.phone}</td>
                        <td className="border px-4 py-2">{employee.role}</td>
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
export default GettingStartedContent