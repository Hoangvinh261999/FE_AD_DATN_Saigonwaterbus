import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Subtitle from '../../../components/Typography/Subtitle'
import { setPageTitle, showNotification } from '../../common/headerSlice'

function FeaturesContent(){

    const dispatch = useDispatch()

    const employees = [
        { id: 1, name: 'Nguyen Van A', position: 'Captain' },
        { id: 2, name: 'Tran Thi B', position: 'Captain' },
        // Thêm các nhân viên khác ở đây
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Danh Sách Thuyền Trưởng</h2>
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Tên</th>
                    <th className="py-2">Chức Vụ</th>
                    <th className="py-2">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td className="border px-4 py-2">{employee.id}</td>
                        <td className="border px-4 py-2">{employee.name}</td>
                        <td className="border px-4 py-2">{employee.position}</td>
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
        </div>
    );
}

export default FeaturesContent