import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const Welcome = lazy(() => import('../pages/protected/Welcome'));
const Page404 = lazy(() => import('../pages/protected/404'));
const Blank = lazy(() => import('../pages/protected/Blank'));
const Charts = lazy(() => import('../pages/protected/Charts'));
const Leads = lazy(() => import('../pages/protected/Leads'));
const Integration = lazy(() => import('../pages/protected/Integration'));
const Calendar = lazy(() => import('../pages/protected/Calendar'));
const Team = lazy(() => import('../pages/protected/Team'));
const Transactions = lazy(() => import('../pages/protected/Transactions'));
const Bills = lazy(() => import('../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'));
const GettingStarted = lazy(() => import('../pages/GettingStarted'));
const DocFeatures = lazy(() => import('../pages/DocFeatures'));
const DocComponents = lazy(() => import('../pages/DocComponents'));
const StaffCreate = lazy(() => import('../pages/AddEmployee'));
const TicketManagement = lazy(() => import('../features/ticket/index'));
const AddRoute = lazy(() => import('../features/route/components/routeForm'));
const Booking = lazy(() => import('../pages/protected/Bookingpage'));
const routes = [
  {
    path: '/trang-chu',
    component: Dashboard,
  },
  {
    path: '/chao-mung',
    component: Welcome,
  },
  {
    path: '/tuyen-tau',
    component: Leads,
  },
  {
    path: '/saigonwaterbus/admin/createRoute/:id?',
    component: AddRoute,
  },
  {
    path: '/gioi-thieu-doi-ngu',
    component: Team,
  },
  {
    path: '/quan-ly-ve',
    component: Calendar,
  },
  {
    path: '/Chuyen-tau',
    component: Transactions,
  },
  {
    path: '/thong-tin-ca-nhan',
    component: ProfileSettings,
  },
  {
    path: '/hoa-don',
    component: Bills,
  },
  {
    path: '/Nhan-vien',
    component: GettingStarted,
  },
  {
    path: '/thuyen-truong',
    component: DocFeatures,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/staff/create',
    component: StaffCreate,
  },
  {
    path: '/ticket-management',
    component: TicketManagement,
  },
  {
    path: '/admin/createRoute/:id?',
    component: AddRoute,
  },
  {
    path: '/booking',
    component: Booking,
  },
];

export default routes;
