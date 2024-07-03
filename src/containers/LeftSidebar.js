import routes from '../routes/sidebar';
import { NavLink, Routes, Link, useLocation } from 'react-router-dom';
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import { useDispatch } from 'react-redux';

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click();
    };

    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content shadow-lg rounded-lg">
                <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-4 font-semibold text-2xl text-center">
                    <Link to={'/app/welcome'}>
                        <img className="mask mask-squircle w-12 mx-auto" src="/logo.png" alt="DashWind Logo" />
                        Saigon Waterbus
                    </Link>
                </li>

                {routes.map((route, k) => {
                    return (
                        <li className="relative mb-2" key={k}>
                            {route.submenu ? (
                                <SidebarSubmenu {...route} />
                            ) : (
                                <NavLink
                                    end
                                    to={route.path}
                                    className={({ isActive }) =>
                                        `block py-2 px-4 rounded-lg transition-all duration-200 ${
                                            isActive
                                                ? 'bg-primary text-white font-semibold shadow-md'
                                                : 'hover:bg-gray-200'
                                        }`
                                    }
                                >
                                    <div className="flex items-center">
                                        {route.icon}
                                        <span className="ml-2">{route.name}</span>
                                    </div>
                                    {location.pathname === route.path && (
                                        <span
                                            className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-secondary"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                                </NavLink>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default LeftSidebar;
