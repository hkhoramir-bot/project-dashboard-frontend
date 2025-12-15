// src/layouts/MainLayout.tsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { LayoutDashboard, FolderCanvas, User, LogOut, Plus } from 'lucide-react'; 
// نیاز به نصب آیکون‌ها: npm install lucide-react

// تعریف لینک‌های منوی کناری
const SidebarLinks = [
    { name: "داشبورد", to: "/", icon: LayoutDashboard },
    { name: "پروژه‌ها", to: "/projects", icon: FolderCanvas },
    { name: "اعضای تیم", to: "/team", icon: User },
    // می‌توانید لینک‌های بیشتری اضافه کنید...
];

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    // هندل خروج کاربر
    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans rtl" dir="rtl">
            {/* 🚪 نوار کناری (Sidebar) */}
            <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-2xl sticky top-0 h-screen">
                
                <div className="p-6 text-2xl font-black text-white border-b border-indigo-800">
                    Project Dashboard
                </div>
                
                <nav className="flex-1 mt-4 px-4 space-y-2">
                    {SidebarLinks.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.to}
                            className="flex items-center gap-3 p-3 rounded-xl text-indigo-100 hover:bg-indigo-800 transition-colors duration-200"
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                    
                    {/* دکمه ایجاد پروژه */}
                    <button 
                        onClick={() => navigate('/projects/new')}
                        className="w-full mt-4 flex items-center justify-center gap-2 p-3 bg-indigo-700 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all shadow-md"
                    >
                        <Plus size={20} />
                        پروژه جدید
                    </button>
                </nav>

                {/* دکمه خروج */}
                <button 
                    onClick={handleLogout}
                    className="m-4 flex items-center gap-3 p-3 text-red-300 hover:bg-red-900/30 rounded-xl transition"
                >
                    <LogOut size={20} />
                    <span>خروج از حساب</span>
                </button>
            </aside>

            {/* 🌐 محتوای اصلی (Main Content) */}
            <div className="flex-1 flex flex-col overflow-x-hidden">
                
                {/* ⏫ هدر (Header) */}
                <header className="bg-white shadow-sm p-4 flex justify-end items-center px-8 border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 text-sm">
                            {user?.name} 
                            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 mr-2 rounded-full text-xs font-medium">
                                {user?.role === 'ADMIN' ? 'مدیر ارشد' : 'عضو تیم'}
                            </span>
                        </span>
                        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>

                {/* ⬇️ محتوای صفحه (DashboardPage, CreateProjectPage, etc.) */}
                <main className="flex-1 p-0">
                    {/* Outlet کامپوننت فرعی (مثل DashboardPage) را در اینجا رندر می‌کند */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;