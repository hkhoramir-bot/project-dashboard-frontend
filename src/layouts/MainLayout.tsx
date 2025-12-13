// src/layouts/MainLayout.tsx

import React from 'react';
import { FaTachometerAlt, FaTasks, FaRegCalendarAlt, FaUsers, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import NavLink from '../components/ui/NavLink';
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-full p-4 bg-gray-800 text-white w-64 fixed right-0 top-0 bottom-0 shadow-2xl">
            <div className="text-2xl font-bold text-indigo-400 mb-8 mt-2">
                پنل مدیریت پروژه
            </div>
            
            <nav className="space-y-2 flex-grow">
                <NavLink to="/" icon={<FaTachometerAlt />}>داشبورد</NavLink>
                <NavLink to="/projects" icon={<FaTasks />}>پروژه‌ها</NavLink>
                <NavLink to="/timeline" icon={<FaRegCalendarAlt />}>زمان‌بندی</NavLink>
                <NavLink to="/team" icon={<FaUsers />}>مدیریت تیم</NavLink>
                <NavLink to="/reports" icon={<FaChartLine />}>گزارش‌ها</NavLink>
            </nav>

            <button 
                onClick={handleLogout}
                className="flex items-center p-3 text-base rounded-lg transition-colors duration-200 text-gray-400 hover:bg-red-700 hover:text-white mt-4"
            >
                <FaSignOutAlt className="ml-3 text-xl" />
                <span className="font-medium text-sm">خروج</span>
            </button>
        </div>
    );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 rtl">
            {/* نوار کناری ثابت */}
            <Sidebar />

            {/* ناحیه محتوای اصلی */}
            {/* w-full و pr-64 برای ایجاد فضای خالی به اندازه سایدبار است */}
            <main className="flex-grow pr-64 overflow-y-auto">
                {/* هدر ساده */}
                <header className="bg-white shadow-sm p-4 flex justify-end items-center border-b border-gray-200">
                    <span className="text-gray-700 text-sm">سلام، مدیر پروژه!</span>
                </header>
                
                {/* محتوای واقعی صفحات */}
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;