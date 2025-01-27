import React, { useState } from "react";
import { 
    HomeIcon, 
    UserGroupIcon, 
    AdjustmentsHorizontalIcon, 
    ArrowLeftEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon,
    IdentificationIcon 
} from '@heroicons/react/24/solid';
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectAccount, selectIsAuth, clear } from "../redux/account/accountSlice";
import { Link, useLocation } from "react-router-dom";
import { message } from "antd";
import { apiAccount } from "../services/apiAccount";
import { useGetUserQuery } from "../services/apiUser";

const Navbar: React.FC = () => {
    const account = useAppSelector(selectAccount);
    const isAuth = useAppSelector(selectIsAuth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [current, setCurrent] = useState<string>(location.pathname);
    const userid = Number(account?.id);
    const { data } = useGetUserQuery(userid);
    
    const handleLogout = () => {
        apiAccount.logout();
        dispatch(clear());
        message.success("Ви вийшли з системи.");
    };

    const handleMenuClick = (path: string) => {
        setCurrent(path);
    };

    return (
        <div className="w-full bg-white shadow-md text-gray-800">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Навігація */}
                <nav className="flex space-x-6">
                    <Link
                        to="/"
                        className={`flex items-center space-x-2 ${current === '/' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/')}
                    >
                        <HomeIcon className="h-5 w-5" />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/contacts"
                        className={`flex items-center space-x-2 ${current === '/contacts' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/contacts')}
                    >
                        <UserGroupIcon className="h-5 w-5" />
                        <span>Contacts</span>
                    </Link>
                    <Link
                        to="/groups"
                        className={`flex items-center space-x-2 ${current === '/contacts' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/contacts')}
                    >
                        <UserGroupIcon className="h-5 w-5" />
                        <span>Groups</span>
                    </Link>
                    <Link
                        to="/settings"
                        className={`flex items-center space-x-2 ${current === '/settings' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/settings')}
                    >
                        <AdjustmentsHorizontalIcon className="h-5 w-5" />
                        <span>Settings</span>
                    </Link>
                </nav>

                {/* Аутентифікація */}
                <div className="flex items-center space-x-4">
                    {isAuth ? (
                        <>
                            <span className="text-gray-600">Hello, {data?.username}</span>
                            <button 
                                type="button" 
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className={`flex items-center space-x-2 ${current === '/login' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={() => handleMenuClick('/login')}
                            >
                                <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                            <Link 
                                to="/register" 
                                className={`flex items-center space-x-2 ${current === '/register' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={() => handleMenuClick('/register')}
                            >
                                <IdentificationIcon className="h-5 w-5" />
                                <span>Register</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
