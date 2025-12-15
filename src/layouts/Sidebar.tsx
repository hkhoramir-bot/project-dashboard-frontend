// src/components/Sidebar.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { LayoutDashboard, Folder, Users, LogOut, Plus, ChevronDown } from 'lucide-react'; 
// نیاز به آیکون‌های Users و ChevronDown است.

// تعریف لینک‌های منوی کناری
const SidebarLinks = [
    { name: "داشبورد", to: "/", icon: LayoutDashboard },
    { name: "پروژه‌ها", to: "/projects", icon: Folder, dropdown: [
        { name: "لیست پروژه‌ها", to: "/projects" },
        { name: "ایجاد پروژه جدید", to: "/projects/new" },
    ]},
    { name: "اعضای تیم", to: "/team", icon: Users },
];

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

    const handleLogout = () => {
        AuthService.logout();
    };

    const handleDropdownToggle = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <aside className="w-64 bg-slate-800 text-white flex flex-col shadow-2xl sticky top-0 h-screen transition-all duration-300">
            
            <div className="p-6 text-2xl font-extrabold text-white border-b border-slate-700 bg-slate-900">
                Project Dashboard
            </div>
            
            <nav className="flex-1 mt-4 px-4 space-y-2 overflow-y-auto">
                {SidebarLinks.map((item) => (
                    <React.Fragment key={item.name}>
                        {/* آیتم اصلی یا دراپ‌داون */}
                        {item.dropdown ? (
                            <div className="space-y-1">
                                <button 
                                    onClick={() => handleDropdownToggle(item.name)}
                                    className="w-full flex justify-between items-center gap-3 p-3 rounded-xl text-slate-200 hover:bg-slate-700/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <ChevronDown 
                                        size={18} 
                                        className={`transform transition-transform ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>
                                {/* محتوای دراپ‌داون */}
                                {openDropdown === item.name && (
                                    <div className="pr-4 space-y-1">
                                        {item.dropdown.map(subItem => (
                                            <Link 
                                                key={subItem.name}
                                                to={subItem.to}
                                                className="block p-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700/70 transition-colors"
                                            >
                                                {subItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // لینک ساده
                            <Link 
                                to={item.to}
                                className="flex items-center gap-3 p-3 rounded-xl text-slate-200 hover:bg-slate-700/50 transition-colors"
                            >
                                <item.icon size={20} />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        )}
                    </React.Fragment>
                ))}
            </nav>

            {/* دکمه خروج */}
            <div className="p-4 border-t border-slate-700">
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-3 bg-red-600/80 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-900/40"
                >
                    <LogOut size={20} />
                    <span>خروج از سیستم</span>
                </button>
            </div>
        </aside>
    );
};
export default Sidebar;