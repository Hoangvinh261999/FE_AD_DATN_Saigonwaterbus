/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [

  {
    path: '/admin/trang-chu',
    icon: <Squares2X2Icon className={iconClasses}/>,
    name: 'Trang Chủ',
  },
  {
    path: '', 
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Nhân Viên', 
    submenu : [
      {
        path: '/admin/nhan-vien',
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Nhân Viên', 
      },
      {
        path: '/admin/thuyen-truong',
        icon: <TableCellsIcon className={submenuIconClasses}/>,
        name: 'Thuyền trưởng',
      }
    ]
  },

  {
    path: '/admin/tuyen-tau', 
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Tuyến tàu', 

  },
  {
    path: '/admin/chuyen-tau', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Chuyến tàu', 

  },
  {
    path: '/admin/tau', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Tàu',

  },
  {
    path: '/admin/ghe-tau', // url
    icon: <BoltIcon className={iconClasses}/>, 
    name: 'Ghế tàu', 
  },
  {
    path: '/admin/ve-tau', // url
    icon: <CalendarDaysIcon className={iconClasses}/>, 
    name: 'Vé tàu', 
  },


  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Hoá đơn', // name that appear in Sidebar
    submenu : [
      {
        path: '/admin/dat-ve', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Đặt Vé', // name that appear in Sidebar
      },
      {
        path: '/admin/hoa-don',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Hóa Đơn',
      },
    ]
  },


  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Trang', // name that appear in Sidebar
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Đăng nhập',
      },
      {
        path: '/logout',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Đăng xuất',
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Register', // name that appear in Sidebar
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Forgot Password',
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Blank Page',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
        name: '404',
      },
    ]
  },
]

export default routes


