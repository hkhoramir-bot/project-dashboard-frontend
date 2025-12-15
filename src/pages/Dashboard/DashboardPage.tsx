// src/pages/Dashboard/DashboardPage.tsx (با هندلینگ خطای بهتر)

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectService } from '../../services/project.service';
import ProjectCard from '../../components/ProjectCard';

const DashboardPage: React.FC = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // ✅ اضافه کردن State خطا
    const navigate = useNavigate();

    useEffect(() => {
        ProjectService.getProjects()
            .then(data => {
                setProjects(data);
                setError(null); // در صورت موفقیت، خطا را پاک کن
            })
            .catch(err => {
                console.error("Error fetching projects:", err);
                // 💡 پیام خطا را برای کاربر شفاف می‌کنیم
                setError('متأسفانه، سرور قادر به ارائه پروژه‌ها نیست. (خطای 500 سرور)');
            })
            .finally(() => setLoading(false));
    }, []);
    
    // ... محتوای قبلی: loading و error ...
    if (loading) {
        return <div className="p-8"><div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600"></div></div></div>;
    }

    // ✅ نمایش خطا
    if (error) {
        return (
            <div className="p-8">
                <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded-xl text-center max-w-xl mx-auto mt-10">
                    <h3 className="font-bold text-lg mb-2">خطای بحرانی در ارتباط با سرور</h3>
                    <p>{error}</p>
                    <p className="mt-2 text-sm">لطفاً وضعیت سرویس Render خود را بررسی کنید.</p>
                </div>
            </div>
        );
    }
    
    // ... رندر اصلی Dashboard ...
    return (
        <div className="p-8 bg-slate-50 min-h-full font-sans rtl" dir="rtl">
            <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-3xl shadow-sm mb-10 gap-4 border border-gray-100">
                <div>
                    <h1 className="text-3xl font-black text-gray-900">میز کار من</h1>
                    <p className="text-gray-500 mt-1">مدیریت و نظارت بر پروژه‌های فعال</p>
                </div>
                <button 
                    onClick={() => navigate('/projects/new')}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all transform hover:-translate-y-1"
                >
                    + تعریف پروژه جدید
                </button>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.length > 0 ? (
                    projects.map(p => <ProjectCard key={p.id} project={p} />)
                ) : (
                    <div className="col-span-full bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
                        <div className="text-6xl mb-4">📂</div>
                        <p className="text-xl text-gray-400 font-bold">هنوز هیچ پروژه‌ای ثبت نکرده‌اید</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DashboardPage;