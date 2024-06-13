import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState } from 'react'
import {Bar, Line} from "react-chartjs-2";

const statsData = [
    {title : "New Users", value : "34.7k", icon : <UserGroupIcon className='w-8 h-8'/>, description : "↗︎ 2300 (22%)"},
    {title : "Total Sales", value : "$34,545", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
    {title : "Pending Leads", value : "450", icon : <CircleStackIcon className='w-8 h-8'/>, description : "50 in hot leads"},
    {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
]

const teamMembers = [
    { name: 'Phạm Minh Đức', role: 'DEV_BE/FE', description: 'Chuyên về phát triển backend và frontend với nhiều năm kinh nghiệm.', image: 'https://via.placeholder.com/150' },
    { name: 'Nguyễn Hoàng Vinh', role: 'DEV_BE/FE', description: 'Có kỹ năng vượt trội trong việc xử lý dữ liệu và xây dựng hệ thống.', image: 'https://via.placeholder.com/150' },
    { name: 'Nguyễn Thị Thu Phương', role: 'DEV_BE/FE', description: 'Chuyên gia về thiết kế và phát triển giao diện người dùng.', image: 'https://via.placeholder.com/150' },
    { name: 'Trần Thị Thúy Diễm', role: 'DEV_BE/FE', description: 'Thành thạo trong việc quản lý dự án và phát triển phần mềm.', image: 'https://via.placeholder.com/150' },
];
function Dashboard() {

    const dispatch = useDispatch()


    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({
            message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`,
            status: 1
        }))
    }

    const [selectedMember, setSelectedMember] = useState(null);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Dataset 1',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data: [65, 59, 80, 81, 56, 55, 40],
            },
            {
                label: 'Dataset 2',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(153, 102, 255, 0.4)',
                hoverBorderColor: 'rgba(153, 102, 255, 1)',
                data: [28, 48, 40, 19, 86, 27, 90],
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        // <div className="container mx-auto px-4 py-6">
        //     <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Giới Thiệu Dự Án Saigon Waterbus</h2>
        //     <p className="text-gray-700 mb-4">
        //         Dự án Saigon Waterbus là một dự án quan trọng với mục tiêu cải thiện giao thông đường thủy tại thành phố Hồ Chí Minh.
        //         Dự án này không chỉ giúp giảm thiểu tình trạng ùn tắc giao thông mà còn tạo ra một phương tiện giao thông xanh và thân thiện với môi trường.
        //     </p>
        //     <h3 className="text-2xl font-bold mb-2 text-blue-600">Nhóm 2</h3>
        //     <p className="text-gray-700 mb-2">
        //         Nhóm 2 chịu trách nhiệm phát triển và quản lý hệ thống này bao gồm các thành viên:
        //     </p>
        //     <div className="flex justify-between mb-4 flex-wrap">
        //         {teamMembers.map((member, index) => (
        //             <div
        //                 key={index}
        //                 onClick={() => handleMemberClick(member)}
        //                 className="cursor-pointer bg-white p-2 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/5 flex-none m-2 text-center"
        //             >
        //                 <img src={member.image} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-2" />
        //                 <h4 className="text-sm font-bold">{member.name}</h4>
        //                 <p className="text-xs text-gray-700">{member.role}</p>
        //             </div>
        //         ))}
        //     </div>
        //     {selectedMember && (
        //         <div className="bg-white p-4 rounded-lg shadow-md">
        //             <h4 className="text-xl font-bold mb-2">{selectedMember.name}</h4>
        //             <p className="text-gray-700">{selectedMember.role}</p>
        //             <p className="text-gray-700">{selectedMember.description}</p>
        //         </div>
        //     )}
        // </div>
        <div className='bg-white w-full h-full'>
        <div style={{width: '600px', height: '400px'}}>
            <Bar data={data} options={options}/>
        </div>
        </div>
    );
}

export default Dashboard