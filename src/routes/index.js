import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const Welcome = lazy(() => import('../pages/protected/Welcome'));
const Page404 = lazy(() => import('../pages/protected/404'));

const RoutePage = lazy(() => import('../pages/protected/Route'));
const Calendar = lazy(() => import('../pages/protected/Calendar'));
const Team = lazy(() => import('../pages/protected/Team'));
const Bills = lazy(() => import('../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'));
const Staff = lazy(() => import('../pages/protected/Staff'));
const Captain = lazy(() => import('../features/captain/Captain'));
// const StaffCreate = lazy(() => import('../pages/AddEmployee'));
const TicketManagement = lazy(() => import('../features/ticket/index'));
const AddRoute = lazy(() => import('../features/route/components/routeForm'));
const Booking = lazy(() => import('../pages/protected/Bookingpage'));
const Layoutbooking = lazy(() => import('../features/Booking/index.js'));
const Tau = lazy(() => import('../features/Ship/index'));
const ChuyenTauTong = lazy(() => import('../features/trip/Trip'));
const TaoChuyen = lazy(() => import('../features/trip/component/TripForm'));
const TaoStaff = lazy(() => import('../features/staff/components/StaffForm'));
const routes = [
  {
    path: '/trang-chu',
    component: Dashboard,
  },
    {
    path: '/dat-ve',
    component: Layoutbooking,
  },
  {
    path: '/chao-mung',
    component: Welcome,
  },
  {
    path: '/tuyen-tau',
    component: RoutePage,
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
    component: ChuyenTauTong,
  },
  {
    path: '/thong-tin-ca-nhan',
    component: ProfileSettings,
  },
  {
    path: '/ve-tau',
    component: Bills,
  },
  {
    path: '/nhan-vien',
    component: Staff,
  },
  {
    path: '/thuyen-truong',
    component: Captain,
  },
  {
    path: '/404',
    component: Page404,
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
  {
    path: '/tau',
    component: Tau,
  },
  {
    path: '/create/trip',
    component: TaoChuyen,
  },
  {
    path: '/nhan-vien/create',
    component: TaoStaff,
  },
];

export default routes;
