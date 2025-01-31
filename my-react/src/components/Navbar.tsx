import React, { useState } from "react";
import { 
    HomeIcon, 
    UserGroupIcon, 
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
    ArrowRightStartOnRectangleIcon,
    ArrowLeftEndOnRectangleIcon,
    IdentificationIcon,
    PlusIcon,

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
        <div className="navBar w-full bg-blue shadow-md text-white-1000">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Навігація */}
                <nav className="flex space-x-6">
                    <Link
                        to="/"
                        className={`flex items-center space-x-2 ${current === '/' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/')}
                    >
                        <HomeIcon className="icon h-5 w-5" />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/contacts"
                        className={`flex items-center space-x-2 ${current === '/contacts' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/contacts')}
                    >
                        <UserGroupIcon className="icon h-5 w-5" />
                        <span>Contacts</span>
                    </Link>
                    <Link
                        to="/groups"
                        className={`flex items-center space-x-2 ${current === '/contacts' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/contacts')}
                    >
                        <UserGroupIcon className="icon h-5 w-5" />
                        <span>Groups</span>
                    </Link>
                    
                    <Link
                        to="/settings"
                        className={`flex items-center space-x-2 ${current === '/settings' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/settings')}
                    >
                        <AdjustmentsHorizontalIcon className="icon h-5 w-5" />
                        <span>About</span>
                    </Link>
                    <Link
                        to="/search"
                        className={`flex items-center space-x-2 ${current === '/search' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => handleMenuClick('/search')}
                    >
                        <MagnifyingGlassIcon className="icon h-5 w-5" />
                        <span>Search</span>
                    </Link>
                    
                </nav>
                
                <p>Social media for programmers</p>
                {/* Аутентифікація */}
                <div className="flex items-center space-x-4">
                    {isAuth ? (
                        <>
                            <Link 
                                to="/profile"
                                className={`flex items-center space-x-2 ${current === '/profile' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={() => handleMenuClick('/profile')}
                            >
                                <span className="text-gray-600">Hello, {data?.username}</span>
                            </Link>
                            <button 
                                type="button" 
                                onClick={handleLogout}
                                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                            >
                                <ArrowRightStartOnRectangleIcon className="icon h-5 w-5" />
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
                                <ArrowLeftEndOnRectangleIcon className="icon h-5 w-5" />
                                <span>Login</span>
                            </Link>
                            <Link 
                                to="/register" 
                                className={`flex items-center space-x-2 ${current === '/register' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                                onClick={() => handleMenuClick('/register')}
                            >
                                <IdentificationIcon className="icon h-5 w-5" />
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
