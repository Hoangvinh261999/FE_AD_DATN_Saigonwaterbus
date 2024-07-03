import { themeChange } from 'theme-change';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon';
import SunIcon from '@heroicons/react/24/outline/SunIcon';
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Weather from '../service/weather';
function Header() {
      const { isLoggedIn, logout } = useAuth();

  const dispatch = useDispatch();
  const { noOfNotifications, pageTitle } = useSelector(state => state.header);
  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme'));
  const username = localStorage.getItem('us');

  useEffect(() => {
    themeChange(false);
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCurrentTheme('dark');
      } else {
        setCurrentTheme('light');
      }
    }
  }, [currentTheme]);

  // Opening right sidebar for notification
  const openNotification = () => {
    dispatch(openRightDrawer({ header: 'Notifications', bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }));
  };

  function logoutUser() {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md overflow-hidden">
      <div className="container mx-auto flex justify-between items-center relative">
    
        <span className="text-xl font-semibold text-gray-800">{pageTitle}</span>
      </div>



      <div className="flex-1">
        <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
          <Bars3Icon className="h-5 inline-block w-5" />
        </label>
        {/* <h1 className="text-sm font-semibold ml-2">{pageTitle}</h1> */}
      </div>

      <div className="flex-none">
              <div className='px-4'>  <Weather/></div>

        <label className="swap">
          <input type="checkbox" />
          <SunIcon data-set-theme="light" data-act-class="ACTIVECLASS" className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')} />
          <MoonIcon data-set-theme="dark" data-act-class="ACTIVECLASS" className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')} />
        </label>

        {/* Notification icon */}
        {/* <button className="btn btn-ghost ml-4  btn-circle" onClick={openNotification}>
          <div className="indicator">
            <BellIcon className="h-6 w-6" />
            {noOfNotifications > 0 ? <span className="indicator-item badge badge-secondary badge-sm">{noOfNotifications}</span> : null}
          </div>
        </button> */}

        {/* Profile icon, opening menu on click */}
        {/* <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {username}
              <img src="https://placeimg.com/80/80/people" alt="profile" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li className="justify-between">
              <Link to={'/app/settings-profile'}>
                Profile Settings
                <span className="badge">New</span>
              </Link>
            </li>
            <li className="">
              <Link to={'/app/settings-billing'}>Bill History</Link>
            </li>
            <div className="divider mt-0 mb-0"></div>
            <li>
            </li>
          </ul>
        </div> */}
                 {isLoggedIn ? (
        <div className="flex items-center px-4">
          <a className="flex items-center hover:text-gray-200" href="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
           {username}
          </a>
          <button
            className="flex items-center hover:text-gray-200 ml-4"
            onClick={logout}
          >
 
            Đăng xuất
                               <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    height="1.5em"
                    width="1.5em"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
                    <path d="M7 12h14l-3-3m0 6l3-3" />
                    </svg>
          </button>
        </div>
      ) : (
        <a className="flex items-center hover:text-gray-200" href="/login">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Đăng nhập
        </a>
      )}

      </div>
    </div>
  );
}

export default Header;
