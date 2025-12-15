// src/layouts/MainLayout.tsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
// برای طرح مدرن، از آیکون‌های کمی متفاوت استفاده می‌کنم
import { LayoutDashboard, FolderOpen, Users, LogOut, Plus } from 'lucide-react'; 

// تعریف لینک‌های منوی کناری
const SidebarLinks = [
    { name: "داشبورد", to: "/", icon: LayoutDashboard },
    { name: "پروژه‌ها", to: "/projects", icon: FolderOpen }, // FolderOpen شیک‌تر است
    { name: "اعضای تیم", to: "/team", icon: Users }, // Users به جای User
];

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    // هندل خروج کاربر
    const handleLogout = () => {
        // از آنجایی که logout در AuthService خودش ریدایرکت می‌کند، اینجا نیازی به navigate نیست
        AuthService.logout(); 
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans rtl" dir="rtl">
            {/* 🚪 نوار کناری (Sidebar) - ظاهر مدرن و تیره */}
            <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-2xl sticky top-0 h-screen transition-all">
                
                <div className="p-6 text-2xl font-black text-indigo-400 border-b border-slate-700">
                    Project Dashboard
                </div>
                
                <nav className="flex-1 mt-4 px-4 space-y-1">
                    {SidebarLinks.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.to}
                            // استایل مدرن‌تر برای لینک‌ها
                            className="flex items-center gap-3 p-3 rounded-xl text-slate-200 hover:bg-indigo-700/50 hover:text-white transition-colors duration-200 group"
                        >
                            <item.icon size={20} className="group-hover:text-indigo-400 transition-colors" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                    
                    {/* دکمه ایجاد پروژه - پررنگ و جدا */}
                    <button 
                        onClick={() => navigate('/projects/new')}
                        className="w-full mt-6 flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-900/50"
                    >
                        <Plus size={20} />
                        ایجاد پروژه
                    </button>
                </nav>

                {/* دکمه خروج - در پایین نوار کناری */}
                <div className="p-4 border-t border-slate-700">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-3 text-red-400 font-medium hover:bg-slate-700 rounded-xl transition"
                    >
                        <LogOut size={20} />
                        <span>خروج از حساب</span>
                    </button>
                </div>
            </aside>

            {/* 🌐 محتوای اصلی (Main Content) */}
            <div className="flex-1 flex flex-col overflow-x-hidden">
                
                {/* ⏫ هدر (Header) - شیک و سبک */}
                <header className="bg-white shadow-sm p-4 flex justify-end items-center px-8 border-b border-gray-200 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        
                        {/* نمایش نام و نقش کاربر */}
                        <div className="text-left">
                            <p className="text-gray-800 font-semibold">{user?.name || 'کاربر میهمان'}</p>
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-0.5 mt-1 inline-block rounded-full text-xs font-medium">
                                {user?.role === 'ADMIN' ? 'مدیر ارشد' : 'عضو تیم'}
                            </span>
                        </div>

                        {/* آواتار کاربر */}
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </div>
                </header>

                {/* ⬇️ محتوای صفحه (رندر کامپوننت‌های مسیریابی شده) */}
                <main className="flex-1 p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;