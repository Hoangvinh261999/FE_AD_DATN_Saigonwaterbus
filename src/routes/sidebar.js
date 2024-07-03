/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
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
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
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
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Nhân Viên', // name that appear in Sidebar
    submenu : [
      {
        path: '/admin/nhan-vien', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Nhân Viên', // name that appear in Sidebar
      },
      {
        path: '/admin/thuyen-truong',
        icon: <TableCellsIcon className={submenuIconClasses}/>,
        name: 'Thuyền trưởng',
      }
    ]
  },

  {
    path: '/admin/tuyen-tau', // url
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Tuyến tàu', // name that appear in Sidebar

  },
  {
    path: '/admin/chuyen-tau', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Chuyến tàu', // name that appear in Sidebar

  },
  {
    path: '/admin/tau', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Tàu', // name that appear in Sidebar

  },
  {
    path: '/admin/ghe-tau', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Ghế tàu', // name that appear in Sidebar

  },
  {
    path: '/admin/ve-tau', // url
    icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
    name: 'Vé tàu', // name that appear in Sidebar
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
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Nhân viên', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Thuyền Trưởng', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>,
        name: 'Nhân viên trong bến',
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


