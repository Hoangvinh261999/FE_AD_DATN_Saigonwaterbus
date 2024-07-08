/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'

import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/admin/trang-chu',
    icon: <img src='/icon/home-button.png' alt=''/>,
    name: 'Trang Chủ',
  },
  {
    path: '', 
    icon: <img src='/icon/staff_1.png' alt=''/>,
    name: 'Nhân Viên', 
    submenu : [
      {
        path: '/admin/nhan-vien',
    icon: <img src='/icon/staff.png' alt=''/>,
        name: 'Nhân Viên', 
      },
      {
        path: '/admin/thuyen-truong',
    icon: <img src='/icon/captain.png' alt=''/>,
        name: 'Thuyền trưởng',
      }
    ]
  },

  {
    path: '/admin/tuyen-tau', 
    icon: <img src='/icon/route.png' alt=''/>,
    name: 'Tuyến tàu', 

  },
  {
    path: '/admin/chuyen-tau', // url
    icon: <img src='/icon/boat.png' alt=''/>,
    name: 'Chuyến tàu', 

  },
  {
    path: '/admin/tau', // url
    icon: <img src='/icon/ship.png' alt=''/>,
    name: 'Tàu',

  },
  {
    path: '/admin/ghe-tau', // url
    icon: <img src='/icon/seats.png' alt=''/>,
    name: 'Ghế tàu', 
  },
  {
    path: '/admin/ve-tau', // url
    icon: <img src='/icon/ticket.png' alt=''/>,
    name: 'Vé tàu', 
  },

  {
    path: '', //no url needed as this has submenu
    icon: <img src='/icon/invoice.png' alt=''/>,
    name: 'Hoá đơn', // name that appear in Sidebar
    submenu : [
      {
        path: '/admin/dat-ve', //url
    icon: <img src='/icon/booking.png' alt=''/>,
        name: 'Đặt Vé', // name that appear in Sidebar
      },
      {
        path: '/admin/hoa-don',
    icon: <img src='/icon/bill.png' alt=''/>,
        name: 'Hóa Đơn',
      },
    ]
  },
]

export default routes


